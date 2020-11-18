Found some inconsistencies

1. ![inc-1](misc/inc-1.png)
   I believe these comments should be swapped in terms of parentId.

2. `_id` or `id` field name. Such contracts should be strictly defined across the entire project.

3. ThreadId is UUID, but CommentId is ObjectId. ObjectId field is incremental in time, but relying on that looks like a hack. I'd suggest to use UUIDs everywhere.
