const request = require("request");
let base_url = "http://localhost:8000/";

const noteId = '60573a3ee9afe04a9899f15c'

describe("POST /notes/add", function() {
    it("Create request. Successful test", function(done) {
        request.post(base_url + 'notes/add', {text: 'Test from Jasmine', title: 'Test Add Note'}, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            let responseObject = JSON.parse(body);
            expect(responseObject.error).toBeUndefined();
            done();
        });
    });
});

describe("GET /notes/:ID", function() {
    it("Select single request. Successful test", function(done) {
        request.get(base_url + `notes/${noteId}`, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            let responseObject = JSON.parse(body);
            expect(responseObject.error).toBeUndefined();
            // expect(noteObj._id).toBe(responseObject._id)
                done();
        });
    });
});


describe("PUT /notes/:ID", function() {
    it("Update request. Successful test", function(done) {
        let newText = 'updated text'
        request.patch(base_url + `notes/${noteId}`, {text: newText},function(error, response, body) {
            expect(response.statusCode).toBe(200);
            let responseObject = JSON.parse(body);
            expect(responseObject.error).toBeUndefined();
            // expect(newText).toBe(responseObject.text)
            done();
        });
    });
});


// describe("Delete /notes/:ID", function() {
//     it("Create request. Successful test", function(done) {
//         request.post(base_url + 'notes/delete', {text: 'Test from Jasmine', title: 'Test Add Note'}, function(error, response, body) {
//             expect(response.statusCode).toBe(200);
//             let responseObject = JSON.parse(body);
//             expect(responseObject.error).toBeUndefined();
//             done();
//         });
//     });
// });


describe("GET /notes/", function() {
    it("Get All request. Successful test", function(done) {
        request.get(base_url + 'notes/all', function(error, response, body) {
            expect(response.statusCode).toBe(200);
            let responseObject = JSON.parse(body);
            expect(responseObject.error).toBeUndefined();
            done();
        });
    });
});