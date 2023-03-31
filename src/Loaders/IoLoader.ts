import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import { useContainer as routingUseContainer } from "routing-controllers";
import { useContainer as classValidatorContainer } from "class-validator";
import {Container} from 'typedi';

export const ioLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {
    console.log('di.........');
    
    routingUseContainer(Container);
    classValidatorContainer(Container);
}
