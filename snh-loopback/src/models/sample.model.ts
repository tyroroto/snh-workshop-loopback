import {Entity, model, property} from '@loopback/repository';

@model()
export class Sample extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  code?: number;


  constructor(data?: Partial<Sample>) {
    super(data);
  }
}

export interface SampleRelations {
  // describe navigational properties here
}

export type SampleWithRelations = Sample & SampleRelations;
