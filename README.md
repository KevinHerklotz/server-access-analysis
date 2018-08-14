# server-access-analysis

Code challenge

# The assignment
Your task is to import the access logs for the EPA from 1995, restructure the data and provide a graphical analysis of the data.

# Preparation
The following link leads to a page with links to the access log of the EPA. The page
contains information on the data and its structure inside the log file. Download the file
and unpack it (The unpacking should not be part of your code).

* [http://ita.ee.lbl.gov/html/contrib/EPA-HTTP.html](http://ita.ee.lbl.gov/html/contrib/EPA-HTTP.html)

# Assignment Tasks

1. Write a script that imports the access logfile and creates a new file that holds the log data structured as a JSON-Array. (See the example at the bottom of this page)

2. Create one or more HTML- and Javascript-Files that read the JSON-File and
render the following analysis graphically as charts:

* Requests per minute over the entire time span
* Distribution of HTTP methods (GET, POST, HEAD,...)
* Distribution of HTTP answer codes (200, 404, 302,...)
* Distribution of the size of the answer of all requests with code 200 and size < 1000B

# Advice
* Please make sure ALL log records are being imported by your importer script.
* The data is from 1995 and might contain uncommon characters - clean them in
the first part.
* The folder “template” can be used as basis for the second part.
* For each analysis, pick the chart type that in your opinion makes most sense to
describe the data (lines, bars, pie charts,...).
* Your application does not have to be supported by a variety of browsers - just
state in which browser it runs best.


# Solution

## Requirements

The solution is based on NodeJS, so it needs to be installed on the system.
Once this is done, you can checkout the repository and run **`npm install`** inside this folder.

## JSON array

To generate the ECMAScript 6 module that exports the correct JSON array you need to run **`npm run generate`** inside the project folder.

## Open website

To see the website showing the charts, run **`npm run start`** (this will start an express server) and go to [http://localhost:3000/](http://localhost:3000/).

You can also see the website [online with rawgit](https://cdn.rawgit.com/KevinHerklotz/server-access-analysis/53b97591/src/epa.html). Load time might be long as the large log file needs to be loaded.

Be sure to use a [modern browser that supports ES6 modules](https://caniuse.com/#feat=es6-module).

## Possible improvements

* If this would be a production website, I would generate the data for the charts also in a backend script, because loading a logfile in the browser with more than 12 MB file size is not recommended at all.
* The prior improvement would also fix problems with eslint, which has trouble to read the large *log.js* file - it is also not possible to exclude is through configuration as it is imported by *epa.js*.
* Tests should be written for all js files, but as this is just an exercise with a limited amount of coding time I only wrote tests for the server side JavaScript.
* [Stylelint](https://github.com/stylelint/stylelint) could be added to lint CSS as well.
