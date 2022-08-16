// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {get} from '@loopback/rest';

export class MainController {
  constructor() { }

  @get('/hello')
  hello(): object {
    return {success: true};
  }

}
