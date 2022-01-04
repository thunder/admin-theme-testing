### Set LFS filter for local development repository

After repository is cloned, it's preferred to setup LFS filter for screenshots folder. It can be done once with following line:
```cypress/snapshots/** filter=lfs diff=lfs merge=lfs -text```

After that following line should be executed to get all existing screenshots from repository:
```git lfs pull```

Every following `git` pull/push should work properly with LFS integration, as long `.gitattributes` is in local repository.


