# Image Upload and get with Amazon RDS Postgres and Elastic Search
This repository contains code that uploads images and gets image from both a Postgres and Elastic search storage.

## Installation

To create a database run

```node
yarn db:create
```

## Usage

To run application, run yarn start

```node
yarn start
```

To upload image, create a multipart formdata with the image attached to a `image` fieldname. Enter the description with the `description` fieldname.

Please note that both the image and description are compulsory.

## Testing

To run tests

```node
yarn test
```


To view sonar information, run the following command after running tests

```node
yarn sonar
```

