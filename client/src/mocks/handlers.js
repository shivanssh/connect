import { rest } from 'msw'

export const handlers = [
  rest.get(
    `http://localhost:3001/users/64ca039c8e7e787e68241aaa`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          _id: '64ca039c8e7e787e68241aaa',
          firstName: 'Test',
          lastName: 'Person',
          email: 'testperson@gmail.com',
          picturePath: 'p10.jpeg',
          friends: ['64c7e13f540f61caf73d220d', '64cb48328019f3c087577dcd'],
          location: 'Test Location',
          occupation: 'Test Occupation',
          impressions: 5693,
          viewedProfile: 2113,
          createdAt: '2023-08-02T07:19:56.537Z',
          updatedAt: '2023-08-03T06:26:09.163Z',
        }),
      )
    },
  ),
  rest.get(
    'http://localhost:3001/users/friends/testUserId',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          _id: '64ca039c8e7e787e68241aaa',
          firstName: 'Test',
          lastName: 'Person',
          email: 'testperson@gmail.com',
          picturePath: 'p10.jpeg',
          location: 'Test Location',
        }),
      )
    },
  ),
]
