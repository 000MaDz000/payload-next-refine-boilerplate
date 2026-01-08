"use client";

import type { DataProvider } from "@refinedev/core";

const API_URL = "/api";

const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const dataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("page", (pagination.current || 1).toString());
      params.append("limit", (pagination.pageSize || 10).toString());
    }

    if (filters) {
      filters.map((filter) => {
        if (filter.operator === "eq") {
          params.append(`where[${filter.field}][equals]`, filter.value);
        }
        // Add other operators as needed
      })
    }

    // Sort? `sort` param in Payload: `title` or `-title`
    if (sorters && sorters.length > 0) {
      const sort = sorters[0];
      params.append("sort", sort.order === "desc" ? `-${sort.field}` : sort.field);
    }

    const url = `${API_URL}/${resource}?${params.toString()}`;
    const { docs, totalDocs } = await fetcher(url);

    return {
      data: docs,
      total: totalDocs,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const data = await fetcher(url);

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${API_URL}/${resource}`;
    const data = await fetcher(url, {
      method: "POST",
      body: JSON.stringify(variables),
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const data = await fetcher(url, {
      method: "PATCH",
      body: JSON.stringify(variables),
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const data = await fetcher(url, {
      method: "DELETE",
    });

    return {
      data,
    };
  },

  // Implement other methods as needed (getMany, createMany, etc.)
  getMany: async ({ resource, ids }) => {
    // payload supports where[id][in]=...
    const params = new URLSearchParams();
    // ids might be numbers or strings
    ids.forEach(id => {
      // This is tricky with URLSearchParams multiple values vs array syntax
      // Payload expects where[id][in][0]=1&where[id][in][1]=2
      // Or comma separated? No, standard query parser.
    });
    // Simplified: Just fetch one by one or ignore for now if not used criticaly
    // But looking at blog-posts/page.tsx, it uses useMany for categories.

    // Let's implement a loop or proper query
    // const query = `where[id][in]=${ids.join(',')}`; // Payload might not support CSV for 'in'?
    // Payload docs: where[id][in][0]=...

    // Fallback: fetch list with filter
    // Actually, let's just do individual requests for simplicity or basic implementation
    // But useMany expects a single array.

    const promises = ids.map(id => fetcher(`${API_URL}/${resource}/${id}`));
    const data = await Promise.all(promises);
    return { data };
  },
};
