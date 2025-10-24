import { createApp } from "./app";
import { config } from "./config/env";
import { logger } from "./utils/logger";

const app = createApp();
app.listen(config.port, () => {
  logger.info(
    `GetEmpStatus running on http://localhost:${config.port} (docs at /docs)`
  );
});
