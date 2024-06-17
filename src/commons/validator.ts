import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { User } from "src/modules/users/user.entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


export type IsUniqeInterface = {
    tableName: string,
    column: string
}


@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private readonly entityManager: EntityManager) {}

    async validate(
        value: any, 
        args?: ValidationArguments): Promise<boolean> {
        
        const {tableName, column}: IsUniqeInterface = args.constraints[0]

        const dataExist = await this.entityManager.getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({[column]: value})
            .getExists()

        return !dataExist
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const field: string = validationArguments.property;
        const val: string = validationArguments.value;
        return `${field} - ${val} sudah ada`;
    }
}

export function isUnique(options: IsUniqeInterface, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        })
    }
}

