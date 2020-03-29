const greets = require("../server/proto/greet_pb");
const geeetService = require("../server/proto/greet_grpc_pb");

const sums = require("../server/proto/calculator_pb");
const sumService = require("../server/proto/calculator_grpc_pb");
const grpc = require("grpc");

const callGreeting = () => {
  const client = new geeetService.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const greeting = new greets.Greeting();
  greeting.setFirstname("Rick");
  greeting.setLastname("Sanchez");

  const request = new greets.GreetRequest();
  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (error) {
      console.error(error);
      return;
      // throw new Error(error);
    }
    console.log(response.getResult());
  });
};

const callSum = () => {
  const sumClient = new sumService.SumServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  var sumRequest = new sums.SumRequest();
  sumRequest.setA(10);
  sumRequest.setB(4);

  sumClient.sum(sumRequest, (error, response) => {
    if (error) {
      console.error(error);
      return;
      // throw new Error(error);
    }
    console.log(response.getResult());
  });
};

(function main() {
  callGreeting();
  callSum();
})();
