"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Case API')
        .setDescription('Users & Posts CRUD')
        .setVersion('1.0')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, doc);
    await app.listen(4001);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`API: http://localhost:4001/api  |  Swagger: http://localhost:4001/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map