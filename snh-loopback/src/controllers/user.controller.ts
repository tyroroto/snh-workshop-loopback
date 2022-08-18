// Uncomment these imports to begin using these cool features!
import {inject} from "@loopback/core";
import {
    RefreshTokenService,
    RefreshTokenServiceBindings, TokenObject,
    TokenServiceBindings, User,
    UserRepository,
    UserServiceBindings
} from "@loopback/authentication-jwt";
import {authenticate, TokenService} from "@loopback/authentication";
import {model, property, repository} from "@loopback/repository";
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {get, getModelSchemaRef, HttpErrors, post, requestBody, SchemaObject} from "@loopback/rest";
import {AuthUserService, Credentials} from "../services";
import {genSalt, hash} from 'bcryptjs';

const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 4,
        },
    },
};

export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': {schema: CredentialsSchema},
    },
};


// Describes the type of grant object taken in by method "refresh"
type RefreshGrant = {
    refreshToken: string;
};

// Describes the schema of grant object
const RefreshGrantSchema: SchemaObject = {
    type: 'object',
    required: ['refreshToken'],
    properties: {
        refreshToken: {
            type: 'string',
        },
    },
};

// Describes the request body of grant object
const RefreshGrantRequestBody = {
    description: 'Reissuing Access Token',
    required: true,
    content: {
        'application/json': {schema: RefreshGrantSchema},
    },
};

@model()
export class NewUserRequest extends User {
    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

export class UserController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: AuthUserService,
        @inject(SecurityBindings.USER, {optional: true})
        public user: UserProfile,
        @repository(UserRepository) protected userRepository: UserRepository,
        @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
        public refreshService: RefreshTokenService,
    ) {
    }

    @post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async login(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return {token};
    }

    @authenticate('jwt')
    @get('/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    })
    async whoAmI(
        @inject(SecurityBindings.USER)
            currentUserProfile: UserProfile,
    ): Promise<string> {
        return currentUserProfile[securityId];
    }

    @post('/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': User,
                        },
                    },
                },
            },
        },
    })
    async signUp(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(NewUserRequest, {
                        title: 'NewUser',
                    }),
                },
            },
        })
            newUserRequest: NewUserRequest,
    ): Promise<User> {
        const existUser = await this.userRepository.findOne({
            where: {email: newUserRequest.email}
        });
        if (existUser == null) {
            const password = await hash(newUserRequest.password, await genSalt());
            delete (newUserRequest as Partial<NewUserRequest>).password;
            const savedUser = await this.userRepository.create(
                newUserRequest
            );
            await this.userRepository.userCredentials(savedUser.id).create({password});
            return savedUser;
        }
        throw new HttpErrors.UnprocessableEntity('user is exist')
    }

    /**
     * A login function that returns refresh token and access token.
     * @param credentials User email and password
     */
    @post('/users/refresh-login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                accessToken: {
                                    type: 'string',
                                },
                                refreshToken: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async refreshLogin(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<TokenObject> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile: UserProfile = this.userService.convertToUserProfile(
            user,
        );
        const accessToken = await this.jwtService.generateToken(userProfile);
        const tokens = await this.refreshService.generateToken(
            userProfile,
            accessToken,
        );
        return tokens;
    }

    @post('/users/refresh', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                accessToken: {
                                    type: 'object',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async refresh(
        @requestBody(RefreshGrantRequestBody) refreshGrant: RefreshGrant,
    ): Promise<TokenObject> {
        return this.refreshService.refreshToken(refreshGrant.refreshToken);
    }
}
