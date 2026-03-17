import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "App";
import { JSX, PropsWithChildren } from "react";

/**
 * Настройка окружения (QueryClient):
 * Создается экземпляр QueryClient с отключенными повторными попытками (retry: false).
 * Это важно для тестов: если запрос упадет, мы хотим узнать об этом сразу, а не ждать,
 * пока библиотека сделает 3 попытки.
 */
queryClient.setDefaultOptions({ queries: { retry: false } });

type TestingProviderProps = PropsWithChildren;

export function TestingProvider(props: TestingProviderProps): JSX.Element {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
