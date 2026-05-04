import { initializeModels, createSequelizeClient } from '@/models';

export type DbModels = ReturnType<typeof initializeModels>;

declare global {
  // eslint-disable-next-line no-var
  var __sequelizeModels: DbModels | undefined;
  // eslint-disable-next-line no-var
  var __sequelizeModelsPromise: Promise<DbModels> | undefined;
}

function shouldAutoSyncSchema() {
  const envValue = process.env.DB_AUTO_SYNC;
  if (typeof envValue === 'string') {
    return envValue === 'true';
  }

  return process.env.NODE_ENV !== 'production';
}

export async function getDb(): Promise<DbModels> {
  if (!global.__sequelizeModelsPromise) {
    global.__sequelizeModelsPromise = (async () => {
      if (!global.__sequelizeModels) {
        const sequelize = createSequelizeClient();
        global.__sequelizeModels = initializeModels(sequelize);

        await sequelize.authenticate();
        if (shouldAutoSyncSchema()) {
          await sequelize.sync({ alter: true });
        }
      }

      return global.__sequelizeModels;
    })().catch((error) => {
      global.__sequelizeModels = undefined;
      global.__sequelizeModelsPromise = undefined;
      throw error;
    });
  }

  return global.__sequelizeModelsPromise;
}
