import * as Router from 'koa-router';

const router = new Router();

router.get('person/list', async ctx => {
  ctx.body = {
    data: [
      {
        id: 1,
        name: 'Person 1'
      },
      {
        id: 2,
        name: 'Person 2'
      },
      {
        id: 3,
        name: 'Person 3'
      }
    ]
  };
});

export const personRouter = router;
