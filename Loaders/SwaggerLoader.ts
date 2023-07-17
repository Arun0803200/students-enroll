import { MicroframeworkLoader, MicroframeworkSettings  } from "microframework";
import {Application} from 'express';
export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings) => {
    const swaggerUi = require('swagger-ui-express');
    const swaggerFile = 'C:/Users/HELLO/students-enroll-fnsh/src/Swagger.json';
    const requireSwagger = require(swaggerFile);
    const expressApp: Application = settings.getData('express_app');
    expressApp.use('/swagger', swaggerUi.serve, swaggerUi.setup(requireSwagger))
}