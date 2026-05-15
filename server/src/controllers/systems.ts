import { logger } from "utils/logger"

const checkHealthy = (req: any, res: any) => {
    logger.info("Health check requested");
    res.send('Server is healthy');
};

export { checkHealthy }
