import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent} from "@loopback/authentication";
import {
  JWTAuthenticationComponent,
  RefreshTokenServiceBindings, TokenServiceBindings,
  UserServiceBindings
} from "@loopback/authentication-jwt";
import {MongodbDataSource} from './datasources';
import {AuthUserService} from "./services";

export {ApplicationConfig};

export class SnhLoopbackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // ------ ADD SNIPPET AT THE BOTTOM ---------
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(MongodbDataSource, UserServiceBindings.DATASOURCE_NAME);
    //Bind datasource for refreshtoken table
    this.dataSource(MongodbDataSource, RefreshTokenServiceBindings.DATASOURCE_NAME)
    this.bind(UserServiceBindings.USER_SERVICE).toClass(AuthUserService);
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to("600");
    // for refresh token expiration
    this.bind(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to("1200");

    // ------------- END OF SNIPPET -------------

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
