import { SetMetadata } from '@nestjs/common';

export const Permissions = (roles: string) => SetMetadata('roles', roles);
