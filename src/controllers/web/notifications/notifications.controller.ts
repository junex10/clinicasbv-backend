import { Body, Controller, HttpStatus, Param, Post, Res, UnprocessableEntityException, UseFilters } from '@nestjs/common';

import { Response } from 'express';
import { HttpExceptionFilter } from 'src/utils';
import { NotificationsService } from './notifications.service';
import {
    NotificationDTO
} from './notifications.entity';

@Controller('api/notifications')
@UseFilters(HttpExceptionFilter)
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @Post('newTreatment')
    async newTreatment(@Res() response: Response, @Body() request: NotificationDTO) {
        try {
            const notification = await this.notificationsService.newTreatment(request);
            return response.status(HttpStatus.OK).json({
                notification
            });
        }
        catch(e) {
            throw new UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
}
