import { ConnectionOptions, parse } from 'pg-connection-string';
import { TlsOptions } from 'tls';
import { createTunnel } from 'tunnel-ssh';
import { DataSourceOptions } from 'typeorm';

const {
  BASTION_PRIVATE_KEY,
  BASTION_USERNAME,
  BASTION_PUBLIC_DNS,
  BASTION_PORT,
} = process.env;

export async function createDataSourceOptions(
  databaseUrl: string,
): Promise<DataSourceOptions> {
  if (!BASTION_PRIVATE_KEY) return { type: 'postgres', url: databaseUrl };

  const databaseConfig = parse(databaseUrl);
  validateDatabaseConfig(databaseConfig);

  const [server] = await createTunnel(
    { autoClose: true, reconnectOnError: false },
    {},
    {
      username: BASTION_USERNAME,
      host: BASTION_PUBLIC_DNS,
      port: BASTION_PORT,
      privateKey: BASTION_PRIVATE_KEY,
    },
    {
      dstAddr: databaseConfig.host,
      dstPort: +databaseConfig.port,
    },
  );

  const tunnelSsh = server.address();
  validateTunnelSsh(tunnelSsh);

  return {
    type: 'postgres',
    username: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    ssl: databaseConfig.ssl as TlsOptions,
    host: tunnelSsh.address,
    port: tunnelSsh.port,
  };
}

function validateTunnelSsh(
  tunnelSsh: unknown,
): asserts tunnelSsh is Readonly<{ address: string; port: number }> {
  if (
    !tunnelSsh ||
    typeof tunnelSsh !== 'object' ||
    !('address' in tunnelSsh) ||
    !('port' in tunnelSsh)
  )
    throw new Error('Could not create tunnel');
}

function validateDatabaseConfig<TOptions extends ConnectionOptions>(
  databaseConfig: TOptions,
): asserts databaseConfig is Readonly<
  Required<{ [Key in keyof TOptions]: NonNullable<TOptions[Key]> }>
> {
  if (
    !databaseConfig.host ||
    !databaseConfig.port ||
    !databaseConfig.user ||
    !databaseConfig.password ||
    !databaseConfig.database
  )
    throw new Error('Invalid database configuration');
}
