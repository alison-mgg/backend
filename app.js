const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();

// CORS configuration to allow requests from http://127.0.0.1:5500
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const careersFilePath = path.join(
  __dirname,
  "../denali-website/public/data/Careers.json"
);
const headingsFilePath = path.join(
  __dirname,
  "../denali-website/public/data/Headings.json"
);
const textFilePath = path.join(
  __dirname,
  "../denali-website/public/data/Text.json"
);
const resultsFilePath = path.join(
  __dirname,
  "../denali-website/public/data/Results.json"
);
const projectPath1 = path.join(
  __dirname,
  "../denali-website/public/data/Projects/Project1.json"
);
const projectPath2 = path.join(
  __dirname,
  "../denali-website/public/data/Projects/Project2.json"
);
const projectPath3 = path.join(
  __dirname,
  "../denali-website/public/data/Projects/Project3.json"
);
const solutionPath1 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution1.json"
);
const solutionPath2 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution2.json"
);
const solutionPath3 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution3.json"
);
const solutionPath4 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution4.json"
);
const solutionPath5 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution5.json"
);
const solutionPath6 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution6.json"
);
const solutionPath7 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution7.json"
);
const solutionPath8 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution8.json"
);
const solutionPath9 = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/Solution9.json"
);
const paragraphsPath = path.join(
  __dirname,
  "../denali-website/public/data/Solutions/paragraphs.json"
);
const accreditationsPath = path.join(
  __dirname,
  "../denali-website/public/data/Accreditations.json"
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// DELETE endpoint to handle job deletion
app.delete("/deleteJob", (req, res) => {
  const { title } = req.body; //test

  // Read the Careers.json file
  fs.readFile(careersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let careers = JSON.parse(data);
    const index = careers.findIndex((job) => job.title === title);

    if (index !== -1) {
      careers.splice(index, 1);

      // Write the updated data back to Careers.json
      fs.writeFile(careersFilePath, JSON.stringify(careers, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send(`Job titled '${title}' deleted successfully.`);
      });
    } else {
      res.status(404).send(`Job titled '${title}' not found.`);
    }
  });
});
// POST endpoint to handle adding a new job
app.post("/addJob", (req, res) => {
  const newJob = req.body;

  // Read the Careers.json file
  fs.readFile(careersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let careers = JSON.parse(data);
    careers.push(newJob);

    // Write the updated data back to Careers.json
    fs.writeFile(careersFilePath, JSON.stringify(careers, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.status(201).send("Job added successfully.");
    });
  });
});
// PUT endpoint to update main heading
app.put("/updateMainHeading", (req, res) => {
  const { mainHeading } = req.body;

  // Read the Headings.json file
  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].mainHeading = mainHeading;

      // Write the updated data back to Headings.json
      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Main heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
// PUT endpoint to update project heading
app.put("/updateProjectHeading", (req, res) => {
  const { projects } = req.body;

  // Read the Headings.json file
  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].projects = projects;

      // Write the updated data back to Headings.json
      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Project heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
// PUT endpoint to update project sub heading
app.put("/updateProjectSubHeading", (req, res) => {
  const { projects_sub } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);

    // Assuming headings is an array and you want to update the first element
    if (headings.length > 0) {
      headings[0].projects_sub = projects_sub; // Update projects_sub field

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Project Sub Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Sub Heading not found.");
    }
  });
});
app.put("/updateProject", (req, res) => {
  const { project, title, description } = req.body;
  let projectPath;

  switch (project) {
    case "1":
      projectPath = projectPath1;
      break;
    case "2":
      projectPath = projectPath2;
      break;
    case "3":
      projectPath = projectPath3;
      break;
    default:
      return res.status(400).send("Invalid project");
  }

  fs.readFile(projectPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let project = JSON.parse(data);
    if (project.length > 0) {
      project[0].title = title;
      project[0].description = description;

      fs.writeFile(projectPath, JSON.stringify(project, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send("Featured Project updated successfully.");
      });
    } else {
      res.status(404).send(" Featured Project not found.");
    }
  });
});
// PUT endpoint to update solution heading
app.put("/updateSolutions", (req, res) => {
  const { solutions } = req.body;

  // Read the Headings.json file
  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].solutions = solutions;

      // Write the updated data back to Headings.json
      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Solution Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateSolutionsDescription", (req, res) => {
  const { description } = req.body;

  // Read the Headings.json file
  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].solutionHomePage = description;

      // Write the updated data back to Headings.json
      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send("Solution Description updated successfully.");
      });
    } else {
      res.status(404).send("Solution Description not found.");
    }
  });
});
app.put("/updateSolution", (req, res) => {
  const { solution, section, text } = req.body;
  let solutionPath;

  switch (solution) {
    case "1":
      solutionPath = solutionPath1;
      break;
    case "2":
      solutionPath = solutionPath2;
      break;
    case "3":
      solutionPath = solutionPath3;
      break;
    case "4":
      solutionPath = solutionPath4;
      break;
    case "5":
      solutionPath = solutionPath5;
      break;
    case "6":
      solutionPath = solutionPath6;
      break;
    case "7":
      solutionPath = solutionPath7;
      break;
    case "8":
      solutionPath = solutionPath8;
      break;
    case "9":
      solutionPath = solutionPath9;
      break;
  }

  fs.readFile(solutionPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let solutionData = JSON.parse(data);
    solutionData.forEach((item) => {
      item.section = section;
    });
    fs.writeFile(solutionPath, JSON.stringify(solutionData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }

      fs.readFile(paragraphsPath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Internal Server Error");
        }

        let paragraphs = JSON.parse(data);
        paragraphs[0][solution] = text;

        fs.writeFile(
          paragraphsPath,
          JSON.stringify(paragraphs, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Internal Server Error");
            }

            res.status(200).send("Solution updated successfully.");
          }
        );
      });
    });
  });
});

// PUT endpoint to update Inside Denali Text
app.put("/updateInsideDenaliText", (req, res) => {
  const { insideText } = req.body;

  // Read the Headings.json file
  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].insideText = insideText;

      // Write the updated data back to Headings.json
      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send("Inside Denali text updated successfully.");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
// PUT endpoint to update inside denali heading
app.put("/updateInsideDenaliHeading", (req, res) => {
  const { inside } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].inside = inside; // Fixed typo from "insdie" to "inside"

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Inside Denali heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateHomeCareersText1", (req, res) => {
  const { futureTextLine1 } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].futureTextLine1 = futureTextLine1;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Home Page Career Section Sub Heading Updated Successfully");
      });
    } else {
      res.status(404).send("Sub Heading not found.");
    }
  });
});
app.put("/updateHomeCareersText2", (req, res) => {
  const { futureTextLine2 } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].futureTextLine2 = futureTextLine2;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Home Page Career Section text updated successfully.");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
app.put("/updateHomeCareerHeading", (req, res) => {
  const { homeCareer } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].homeCareer = homeCareer; // Fixed typo from "insdie" to "inside"

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res
            .status(200)
            .send("Home Page Career Section Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateResultsHeading", (req, res) => {
  const { results } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].results = results; // Fixed typo from "insdie" to "inside"

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Results Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateResultsNumber", (req, res) => {
  const { index, newNumber } = req.body;

  fs.readFile(resultsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }

    let results = JSON.parse(data);
    if (index < 0 || index >= results.length) {
      return res.status(400).send("Invalid index");
    }

    results[index].number = newNumber;

    fs.writeFile(
      resultsFilePath,
      JSON.stringify(results, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }

        res.send("Result Number updated successfully");
      }
    );
  });
});
app.put("/updateResultsCategory", (req, res) => {
  const { index, newCategory } = req.body;

  fs.readFile(resultsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }

    let results = JSON.parse(data);
    if (index < 0 || index >= results.length) {
      return res.status(400).send("Invalid index");
    }

    results[index].category = newCategory;

    fs.writeFile(
      resultsFilePath,
      JSON.stringify(results, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }

        res.send("Result Category updated successfully");
      }
    );
  });
});
app.put("/updateAboutUsHeading", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].aboutUs = AboutUs;

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("About Us heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateAboutUsSubHeading", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].aboutUsSub = AboutUs;

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("About Us Sub Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateAboutUsSection1", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].aboutTextLine1 = AboutUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("About Us text section 1 Updated Successfully");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
app.put("/updateAboutUsSection2", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].aboutTextLine2 = AboutUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("About Us text section 2 Updated Successfully");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
app.put("/updateAboutUsSection3", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].aboutTextLine3 = AboutUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("About Us text section 3 Updated Successfully");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
app.put("/updateAboutUsSection4", (req, res) => {
  const { AboutUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].aboutTextLine4 = AboutUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("About Us text section 4 Updated Successfully");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});
app.put("/updateContactUsHeading1", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].contactUs1 = ContactUs;

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Contact US heading 1 updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateContactUsHeading2", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].contactUs2 = ContactUs;

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Contact Us heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateContactUsEmail", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].contactEmail = ContactUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Contact Us Email Updated Successfully");
      });
    } else {
      res.status(404).send("Email not found.");
    }
  });
});
app.put("/updateContactUsPhone", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].contactPhone = ContactUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Contact Us Phone Number Updated Successfully");
      });
    } else {
      res.status(404).send("Phone Number not found.");
    }
  });
});
app.put("/updateContactUsAddress", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].contactAddress = ContactUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Contact Us Address Updated Successfully");
      });
    } else {
      res.status(404).send("Address not found.");
    }
  });
});
app.put("/updateContactUsCity", (req, res) => {
  const { ContactUs } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].contactCity = ContactUs;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Contact Us City Updated Successfully");
      });
    } else {
      res.status(404).send("City not found.");
    }
  });
});
app.delete("/deleteSolution", (req, res) => {
  const { solution, project } = req.body; //test

  let solutionPath;

  switch (solution) {
    case "1":
      solutionPath = solutionPath1;
      break;
    case "2":
      solutionPath = solutionPath2;
      break;
    case "3":
      solutionPath = solutionPath3;
      break;
    case "4":
      solutionPath = solutionPath4;
      break;
    case "5":
      solutionPath = solutionPath5;
      break;
    case "6":
      solutionPath = solutionPath6;
      break;
    case "7":
      solutionPath = solutionPath7;
      break;
    case "8":
      solutionPath = solutionPath8;
      break;
    case "9":
      solutionPath = solutionPath9;
      break;
  }
  // Read the Careers.json file
  fs.readFile(solutionPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let projects = JSON.parse(data);
    const index = projects.findIndex((title) => title.project === project);

    if (index !== -1) {
      projects.splice(index, 1);

      // Write the updated data back to Careers.json
      fs.writeFile(solutionPath, JSON.stringify(projects, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send(`Solution Project '${project}' deleted successfully.`);
      });
    } else {
      res.status(404).send(`Solution Project not found.`);
    }
  });
});
app.post("/addSolution", (req, res) => {
  const { solution,newPost} = req.body; //test

  let solutionPath;

  switch (solution) {
    case "1":
      solutionPath = solutionPath1;
      break;
    case "2":
      solutionPath = solutionPath2;
      break;
    case "3":
      solutionPath = solutionPath3;
      break;
    case "4":
      solutionPath = solutionPath4;
      break;
    case "5":
      solutionPath = solutionPath5;
      break;
    case "6":
      solutionPath = solutionPath6;
      break;
    case "7":
      solutionPath = solutionPath7;
      break;
    case "8":
      solutionPath = solutionPath8;
      break;
    case "9":
      solutionPath = solutionPath9;
      break;
  }

  // Read the Careers.json file
  fs.readFile(solutionPath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
    }

    let postings = JSON.parse(data);
    postings.push(newPost);

    fs.writeFile(solutionPath, JSON.stringify(postings, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.status(201).send("Solution Project added successfully.");
    });
});
});
app.put("/updateCareersPageHeading", (req, res) => {
  const { Careers } = req.body;

  fs.readFile(headingsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let headings = JSON.parse(data);
    if (headings.length > 0) {
      headings[0].careerPage = Careers;

      fs.writeFile(
        headingsFilePath,
        JSON.stringify(headings, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Career Page Heading updated successfully.");
        }
      );
    } else {
      res.status(404).send("Heading not found.");
    }
  });
});
app.put("/updateCareersPageText", (req, res) => {
  const { currentPostingstext } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].currentPostings = currentPostingstext;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Career Page Text Updated Successfully");
      });
    } else {
      res.status(404).send("Sub Heading not found.");
    }
  });
});
app.put("/updateNoPostingsText", (req, res) => {
  const { noPostingsText } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].noPostings = noPostingsText;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("No Current Postings Text Updated Successfully");
      });
    } else {
      res.status(404).send("Sub Heading not found.");
    }
  });
});
app.put("/updateApplyText", (req, res) => {
  const { applyText } = req.body;

  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let texts = JSON.parse(data);
    if (texts.length > 0) {
      texts[0].apply = applyText;

      fs.writeFile(textFilePath, JSON.stringify(texts, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res
          .status(200)
          .send("Apply Text Updated Successfully");
      });
    } else {
      res.status(404).send("Text not found.");
    }
  });
});

function readAccreditations() {
  try {
      const data = fs.readFileSync(accreditationsPath, 'utf8');
      return JSON.parse(data);
  } catch (err) {
      console.error(err);
      return { accreditations: [] };
  }
}

app.post('/addAccreditation', (req, res) => {
  const { accreditation } = req.body;

  // Read existing accreditations
  let accreditations = readAccreditations();

  // Check if accreditation already exists
  if (accreditations.accreditations.includes(accreditation)) {
      return res.status(400).send('Accreditation already exists.');
  }

  // Add new accreditation
  accreditations.accreditations.push(accreditation);

  // Write updated data back to file
  fs.writeFile(accreditationsPath, JSON.stringify(accreditations, null, 2), 'utf8', (err) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error writing file.');
      }
      res.status(200).send('Accreditation added successfully.');
  });
});
app.delete('/deleteAccreditation', (req, res) => {
  const { accreditation } = req.body;

  // Read the JSON file
  fs.readFile(accreditationsPath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error reading file.');
      }

      let accreditations = JSON.parse(data);

      // Find index of accreditation in the array
      const index = accreditations.accreditations.findIndex(item => item === accreditation);

      if (index !== -1) {
          // Remove the accreditation from the array
          accreditations.accreditations.splice(index, 1);

          // Write updated data back to file
          fs.writeFile(accreditationsPath, JSON.stringify(accreditations, null, 2), 'utf8', (err) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Error writing file.');
              }
              res.status(200).send('Accreditation deleted successfully.');
          });
      } else {
          res.status(404).send('Accreditation not found.');
      }
  });
});
const port = 3001; // Port for the backend server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
