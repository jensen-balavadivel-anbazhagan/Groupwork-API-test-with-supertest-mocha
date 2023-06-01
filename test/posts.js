//Tester:Asha Divakar
import supertest from "supertest";
import { expect } from "chai";
import  dotenv from "dotenv";
import { createRandomPost } from "../helpers/post_helper";
import { createPostUser } from "../helpers/post_helper";

// Configuration
dotenv.config();

// Setup
const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.USER_TOKEN;


describe('/posts route', () => {
    
    let userId = null;
    let postId = null;
    /* Creating a fresh user so we have one to work with */
    it('create user', async () => {
        const data = createPostUser();
        const res = await request
            .post('users')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
        userId = res.body.id;

    });

    //Tests
    it(`GET /posts`, async () => {
        const res = await request.get('posts')
        userId = res.body[0].user_id;
    });


    it('POST /posts', async () => {
        //this.retries(4);
        const data = createRandomPost(userId);
        const res = await request
            .post("posts")
            .set('Authorization', `Bearer 2a4fb0728d880d1cf439ab3fcbe106dd5b3155a2bf480dbe6c5a9158aac31513`)
            .send(data);
        expect(res.body).to.deep.include(data);
        expect(res.body).to.have.property('id');
        // Get back the id of the post we just created to use later
        postId = res.body.id;
    });

    it('GET /posts/:id', async () => {
        const res = await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            //.set('Authorization', `Bearer 2a4fb0728d880d1cf439ab3fcbe106dd5b3155a2bf480dbe6c5a9158aac31513`);
        
        expect(res.body.id).to.eq(postId);
    });


    it('PUT /posts/:id', async () => {
        const data = {
            title: 'This post has new title',
            body: 'This post has a new body'
        }

     const res = await request.put(`posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
         .send(data);
     expect(res.body.title).to.eq(data.title);
     expect(res.body.body).to.eq(data.body);
    });


    it('DELETE /posts/:id', async () => {
        const res = await request.delete(`posts/${postId}`)
            .set('Authorization', `Bearer ${token}`);
        
            expect(res.body).to.empty;
    });

    it("POST posts | Negative", async () => {
        const data = {};
        const res = await request.post("posts")
        .set('Authorization',  `Bearer ${token}` )
        .send(data);
        expect(res.body[0].message).to.eq("must exist");
    });

    // /* Cleanup */
    // after(async () => {
    //     const res = await request
    //         .delete(`users/${userId}`)
    //         .set('Authorization', `Bearer ${token}`);
    // });

});
