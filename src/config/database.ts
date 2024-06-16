import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from 'pg';


@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private client: Client;

    constructor(private configService: ConfigService) {
        this.client = new Client({
            host: this.configService.get<string>('database.db_host'),
            user: this.configService.get<string>('database.db_user'),
            password: this.configService.get<string>('database.db_pass'),
            database: this.configService.get<string>('database.db_name'),
        });
    }

    async onModuleInit() {
        try {
            await this.client.connect();
            console.log('Database connection successful!');
        } catch (err) {
            console.error('Database connection error:', err.stack);
        }
    }

    async onModuleDestroy() {
        await this.client.end();
    }

    getClient() {
        return this.client;
    }

}