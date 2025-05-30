/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SimulateTournamentImport } from './routes/simulate-tournament'
import { Route as SimulateImport } from './routes/simulate'
import { Route as ConvertImport } from './routes/convert'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SimulateTournamentRoute = SimulateTournamentImport.update({
  id: '/simulate-tournament',
  path: '/simulate-tournament',
  getParentRoute: () => rootRoute,
} as any)

const SimulateRoute = SimulateImport.update({
  id: '/simulate',
  path: '/simulate',
  getParentRoute: () => rootRoute,
} as any)

const ConvertRoute = ConvertImport.update({
  id: '/convert',
  path: '/convert',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/convert': {
      id: '/convert'
      path: '/convert'
      fullPath: '/convert'
      preLoaderRoute: typeof ConvertImport
      parentRoute: typeof rootRoute
    }
    '/simulate': {
      id: '/simulate'
      path: '/simulate'
      fullPath: '/simulate'
      preLoaderRoute: typeof SimulateImport
      parentRoute: typeof rootRoute
    }
    '/simulate-tournament': {
      id: '/simulate-tournament'
      path: '/simulate-tournament'
      fullPath: '/simulate-tournament'
      preLoaderRoute: typeof SimulateTournamentImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/convert': typeof ConvertRoute
  '/simulate': typeof SimulateRoute
  '/simulate-tournament': typeof SimulateTournamentRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/convert': typeof ConvertRoute
  '/simulate': typeof SimulateRoute
  '/simulate-tournament': typeof SimulateTournamentRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/convert': typeof ConvertRoute
  '/simulate': typeof SimulateRoute
  '/simulate-tournament': typeof SimulateTournamentRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/convert' | '/simulate' | '/simulate-tournament'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/convert' | '/simulate' | '/simulate-tournament'
  id: '__root__' | '/' | '/convert' | '/simulate' | '/simulate-tournament'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ConvertRoute: typeof ConvertRoute
  SimulateRoute: typeof SimulateRoute
  SimulateTournamentRoute: typeof SimulateTournamentRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ConvertRoute: ConvertRoute,
  SimulateRoute: SimulateRoute,
  SimulateTournamentRoute: SimulateTournamentRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/convert",
        "/simulate",
        "/simulate-tournament"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/convert": {
      "filePath": "convert.tsx"
    },
    "/simulate": {
      "filePath": "simulate.tsx"
    },
    "/simulate-tournament": {
      "filePath": "simulate-tournament.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
