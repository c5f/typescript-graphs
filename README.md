TypeScript Graphs
=================

This repository contains various graph components and implementations written in [TypeScript][ts].

Apollo Proposal
---------------

`src/dStarLite/dStarLite.ts` has the main implementation and includes requirements that have more details.

`src/dStarLite/dStarKey.ts` and `src/dStarLite/dStarNode.ts` are fairly straightforward, and `src/interfaces/priorityQueue.ts` contains the queue description, analysis, and a placeholder `DummyQueue` implementation to allow compilation.

System Requirements
-------------------

* [nvm][nvm]

Setup
-----

From the cloned repository, install dev dependencies:

    nvm install
    npm install

Compiling
---------

After installing dependencies, the `watch` npm script will watch for changes and run the `tsc` compiler on source file changes before executing the `test` npm script.  See package.json and tsconfig.json for more information, as well as the npm and TypeScript documentation to explain the structure of each.

[ArcticTypescript][ats] is an IDE-grade Sublime Text 3 integration for TypeScript projects.
    
Resources
---------

* [TypeScript Handbook][ts_handbook]
* [TypeScript Language Spec][ts_spec]

Contributing
------------

I use [git-flow][git_flow], but you don't have to.  Please submit PRs to the develop branch.

[ts]: //www.typescriptlang.org
[nvm]: /creationix/nvm
[ats]: /Phaiax/ArcticTypescript
[ts_handbook]: //www.typescriptlang.org/Handbook
[ts_spec]: //www.typescriptlang.org/Content/TypeScript%20Language%20Specification.pdf
[git_flow]: /nvie/gitflow
