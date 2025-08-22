import { useQuery, QueryHookOptions, DocumentNode } from '@apollo/client';
import { useAuthStore } from '../store/authStore';

export function useAuthenticatedQuery<TData = any, TVariables = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) {
  const token = useAuthStore((state) => state.token);
  
  return useQuery<TData, TVariables>(query, {
    ...options,
    context: {
      ...options?.context,
      headers: {
        ...options?.context?.headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });
}


