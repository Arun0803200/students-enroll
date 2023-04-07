import { bootstrapMicroframework } from "microframework";
import { ioLoader } from "../Loaders/IoLoader";
import { mongooseLoader } from "../Loaders/MongooseLoader";
import { expressLoader } from "../Loaders/ExpressLoader";
import { homeLoader } from "../Loaders/HomeLoader";
bootstrapMicroframework({
    loaders:[
        ioLoader,
        mongooseLoader,
        expressLoader,
        homeLoader
    ]
}).then(()=>{console.log('app running......')}).catch((err) => {console.log(err)});
