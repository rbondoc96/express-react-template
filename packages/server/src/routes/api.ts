import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authController } from '@/http/controllers/auth-controller';
import swaggerDocument from '@/swagger.json' with { type: 'json' };

export const apiRouter = Router();

apiRouter.get('/', (_req, res, _next) => {
    res.redirect('/api/docs');
});
apiRouter.use('/auth', authController);
apiRouter.use('/docs', swaggerUi.serve);
apiRouter.get('/docs', swaggerUi.setup(swaggerDocument));
