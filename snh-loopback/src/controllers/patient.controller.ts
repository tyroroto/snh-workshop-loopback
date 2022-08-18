import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where
} from '@loopback/repository';
import {
    del, get,
    getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
    response
} from '@loopback/rest';
import {Patient} from '../models';
import {BookingRepository, PatientRepository} from '../repositories';

export class PatientController {
    constructor(
        @repository(BookingRepository)
        public bookingRepository: BookingRepository,
        @repository(PatientRepository)
        public patientRepository: PatientRepository,
    ) {
    }

    @post('/patients')
    @response(200, {
        description: 'Patient model instance',
        content: {'application/json': {schema: getModelSchemaRef(Patient)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Patient, {
                        title: 'NewPatient',
                        exclude: ['id'],
                    }),
                },
            },
        })
            patient: Omit<Patient, 'id'>,
    ): Promise<Patient> {
        return this.patientRepository.create(patient);
    }

    @get('/patients/count')
    @response(200, {
        description: 'Patient model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(Patient) where?: Where<Patient>,
    ): Promise<Count> {
        return this.patientRepository.count(where);
    }

    @get('/patients')
    @response(200, {
        description: 'Array of Patient model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Patient, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(Patient) filter?: Filter<Patient>,
    ): Promise<Patient[]> {
        return this.patientRepository.find(filter);
    }

    @patch('/patients')
    @response(200, {
        description: 'Patient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Patient, {partial: true}),
                },
            },
        })
            patient: Patient,
        @param.where(Patient) where?: Where<Patient>,
    ): Promise<Count> {
        return this.patientRepository.updateAll(patient, where);
    }

    @get('/patients/{id}')
    @response(200, {
        description: 'Patient model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Patient, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(Patient, {exclude: 'where'}) filter?: FilterExcludingWhere<Patient>
    ): Promise<Patient> {
        return this.patientRepository.findById(id, filter);
    }


    @get('/patients-hn/{hn}')
    @response(200, {
        description: 'Patient model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Patient, {includeRelations: true}),
            },
        },
    })
    async findByHn(
        @param.path.string('hn') hn: number,
        @param.filter(Patient, {exclude: 'where'}) filter?: FilterExcludingWhere<Patient>
    ): Promise<Patient | null> {
        const patient = await this.patientRepository.findOne({where: {hn}});
        ;
        if (patient == null) {
            throw new HttpErrors.NotFound('HN Not exist')
        }
        return patient
    }


    @patch('/patients/{id}')
    @response(204, {
        description: 'Patient PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Patient, {partial: true}),
                },
            },
        })
            patient: Patient,
    ): Promise<void> {
        await this.patientRepository.updateById(id, patient);
    }

    @put('/patients/{id}')
    @response(204, {
        description: 'Patient PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() patient: Patient,
    ): Promise<void> {
        await this.patientRepository.replaceById(id, patient);
    }

    @del('/patients/{id}')
    @response(204, {
        description: 'Patient DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.patientRepository.deleteById(id);
    }

    @post('/patients/book')
    @response(200, {
        description: 'Patient model instance',
    })
    async book(
        @requestBody({
            content: {
                'application/json': {},
            },
        })
            body: { hn: number, code: string },
    ): Promise<Patient> {
        // check code
        const existBooking = await this.bookingRepository.findOne({where: {code: body.code}});
        if (existBooking == null) {
            throw new HttpErrors.UnprocessableEntity('Code is not exist')
            // throw new Error('Code is not exist')
        }
        // check hn in mongo
        let p = await this.patientRepository.findOne({where: {hn: body.hn}});
        if (p == null) {
            // find in mssql
            // const pMssql = await this.hmsService.getPatientByHn(body.hn);
            // console.log(pMssql);
            // if (pMssql.lenght > 0) {
            //   // save to mongo
            //   // pMssql[0]
            //   await this.patientRepository.create({
            //     firstname: pMssql[0]['fname'],
            //     lastname: pMssql[0]['lname'],
            //     hn: pMssql[0]['hn'],
            //   })
            // } else {
            //   // if no throw
            //   // throw new Error('asdsad')
            //   throw new HttpErrors.UnprocessableEntity('HN is not exist')
            // }
        }
        p = await this.patientRepository.findOne({where: {hn: body.hn}});
        if (p != null) {
            // เตรียม Array----
            if (p.bookings == null) {
                p.bookings = [];
            }
            p.bookings.push(existBooking);
            await this.patientRepository.updateById(p.id, p);
            return p;
        }
        throw new Error('ERROR');
    }

    @post('/patients/search')
    @response(200, {
        description: 'Patient model instance',
    })
    async searchHn(
        @requestBody({
            content: {
                'application/json': {},
            },
        })
            body: { hn: number },
    ): Promise<Patient> {
        console.log(body)
        // body.hn
        // check hn in mongo
        const p = await this.patientRepository.findOne({where: {hn: body.hn}});
        if (p != null) {
            return p;
        }
        throw new Error('ERROR');
    }

}
