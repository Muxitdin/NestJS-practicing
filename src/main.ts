import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "node:process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle("Advanced BACKEND | NestJS")
        .setDescription("REST API documentation")
        .setVersion("1.0.0")
        .addTag("Muxitdin")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}

start();