import Bottle from 'bottlejs';
import ServiceBase from './service-base';
export {
  ServiceBase,
};

class ServiceState {
  constructor(service, serviceStateMap, depFuncName = 'start'){
    this.service = service;
    this.serviceStateMap = serviceStateMap;
    this.depFuncName = depFuncName;
    this.Class = service.constructor;
    this.name = this.Class.$name;
    this.resolving = false;
    this.promiseFunc = null;
  }

  preparePromiseFunc(){
    if(this.promiseFunc){
      return this.promiseFunc;
    }

    if(this.resolving){
      throw new Error('Circular dependencies occured :' + this.name);
    }

    this.resolving = true;

    this.depPromiseFuncs = (this.Class[`$${this.depFuncName}Deps`] || [])
    .map(dep => {
      let depService = this.serviceStateMap[dep];
      if(!depService){
        throw new Error('Service not Found :' + dep);
      }
      return depService.preparePromiseFunc();
    });

    this.resolving = false;

    this.promiseFunc = (containerInterface) => Promise.all(this.depPromiseFuncs.map(depPromiseFunc => depPromiseFunc(containerInterface)))
    .then(() => this.service[this.depFuncName](containerInterface));
    return this.promiseFunc;
  }
}

export default class Azioc {
  constructor(){
    this.bottle = new Bottle();
    this.registrationMap = {};
    this.registrationArray = [];

    this.containerInterface = {
      get: this.get,
    };
  }

  get = (name) => {
    return this.bottle.container[name];
  };

  register(Classes){
    if(Array.isArray(Classes)){
      return Classes.map(Class => this.register(Class))
    }

    let Class = Classes;
    let name = Classes.$name;
    if(!name){
      throw new Error(`$name not found, Class: ${Class.name}`);
    }
    if(name in this.registrationMap){
      throw new Error(`$name (${name}) already exists`);
    }
    this.registrationMap[name] = Class;
    this.registrationArray.push(Class);
    this.bottle.register(Class);
    return true;
  }

  genPromiseFuncs(services, depFuncName = 'start'){
    let serviceStateMap = {};
    let serviceStateArray = [];
    services.forEach(service => {
      let serviceState = new ServiceState(service, serviceStateMap, depFuncName);
      serviceStateMap[serviceState.name] = serviceState;
      serviceStateArray.push(serviceState);
    });

    return serviceStateArray.map(serviceState => serviceState.preparePromiseFunc());
  }

  start(){
    return Promise.all(
      this.genPromiseFuncs(
        this.bottle.digest(this.registrationArray.map(service => service.$name)),
        'start'
      ).map(promiseFunc => promiseFunc(this.containerInterface))
    );
  }
}
