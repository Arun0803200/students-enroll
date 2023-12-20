import { bootstrapMicroframework } from "microframework";
import { ioLoader } from "../Loaders/IoLoader";
import { mongooseLoader } from "../Loaders/MongooseLoader";
import { expressLoader } from "../Loaders/ExpressLoader";
import { homeLoader } from "../Loaders/HomeLoader";
// import { swaggerLoader } from "../Loaders/SwaggerLoader";
bootstrapMicroframework({
    loaders:[
        ioLoader,
        mongooseLoader,
        expressLoader,
        // swaggerLoader,
        homeLoader,
    ]
}).then(()=>{console.log('app running......')}).catch((err) => {console.log(err)});
