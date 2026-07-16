import pino from 'pino';

const isBrowser = typeof window !== 'undefined';
const resolvedLogLevel =
  process.env.NODE_ENV === 'test'
    ? 'silent'
    : (process.env.NEXT_PUBLIC_LOG_LEVEL ?? process.env.LOG_LEVEL ?? 'info');

const logger = pino({
  name: 'starsoft-teste',
  level: resolvedLogLevel,
  base: {
    env: process.env.NODE_ENV,
    runtime: isBrowser ? 'browser' : 'server',
  },
  browser: isBrowser
    ? {
        asObject: true,
      }
    : undefined,
});

function resolveModulePathFromStack(): string | null {
  const stack = new Error().stack?.split('\n') ?? [];

  for (const line of stack) {
    if (line.includes('logger.ts') || line.includes('createLogger')) {
      continue;
    }

    const matchedPath = line.match(
      /(?:webpack-internal:\/\/\/.*?\/\.\/|.*?)(src[\\/][^:\n)]+)(?::\d+:\d+)?/,
    );

    if (!matchedPath) {
      continue;
    }

    return matchedPath[1].replaceAll('\\', '/');
  }

  return null;
}

function resolveScopeBindings(modulePath: string): Record<string, unknown> {
  const [, rootSegment = 'module', secondSegment] = modulePath.split('/');
  const fileName = modulePath.split('/').at(-1) ?? 'unknown';
  const moduleName = fileName.replace(/\.(t|j)sx?$/, '');

  let scope = rootSegment;

  if (rootSegment === 'services') {
    scope = 'service';
  } else if (rootSegment === 'actions') {
    scope = 'action';
  } else if (rootSegment === 'utils') {
    scope = 'util';
  } else if (rootSegment === 'components' && secondSegment === 'providers') {
    scope = 'provider';
  } else if (rootSegment === 'components') {
    scope = 'component';
  }

  return {
    scope,
    [scope]: moduleName,
    module: modulePath,
  };
}

export function createLogger(bindings?: Record<string, unknown>) {
  const resolvedBindings =
    bindings ?? resolveScopeBindings(resolveModulePathFromStack() ?? 'src/module/unknown');

  return logger.child(resolvedBindings);
}

export function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
}

export { logger };
