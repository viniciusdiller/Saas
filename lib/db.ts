import { initializeModels, createSequelizeClient } from '@/models';
import { DataTypes } from 'sequelize';

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

async function ensureRoomAmenitiesColumn(models: DbModels) {
  const table = await models.sequelize.getQueryInterface().describeTable('rooms');

  if (!table.amenities) {
    await models.sequelize.getQueryInterface().addColumn('rooms', 'amenities', {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: 'JSON array de comodidades',
    });
  }
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
        await ensureRoomAmenitiesColumn(global.__sequelizeModels);
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
