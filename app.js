import inquirer from 'inquirer';
import svgCaptcha from 'svg-captcha';
import svg2img from 'svg2img';
import fs from 'fs';


// Questions to prompt the user
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter the text for your logo:',
  },
  {
    type: 'list',
    name: 'color',
    message: 'Select a color for your logo:',
    choices: ['red', 'green', 'blue', 'yellow', 'purple'],
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Select a shape for your logo:',
    choices: ['circle', 'square', 'triangle'],
  },
];

// Ask the user the questions
inquirer.prompt(questions).then((answers) => {
  // Generate the SVG image using svg-captcha
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: '0o1ilI', // To avoid confusion between similar characters
    noise: 3,
    color: true,
    background: '#f0f0f0',
    width: 200,
    height: 100,
});


  // Replace the captcha text with the user input
  captcha.text = answers.text;

  // Add the selected color and shape to the SVG
  captcha.data = captcha.data.replace(
    /<circle/g,
    `<circle fill="${answers.color}"`
  );


  // Add the selected shape to the SVG
  captcha.data = captcha.data.replace(
    /<rect/g,
    `<${answers.shape}`
  );
  captcha.data = captcha.data.replace(
    /<circle/g,
    `<${answers.shape} r="50"`
  );
  captcha.data = captcha.data.replace(
    /<polygon/g,
    `<${answers.shape}`
  );
  captcha.data = captcha.data.replace(
    /<path/g,
    `<${answers.shape}`
  );
  captcha.data = captcha.data.replace(
    /<ellipse/g,
    `<${answers.shape} rx="50" ry="30"`
  );
  captcha.data = captcha.data.replace(
    /<line/g,
    `<${answers.shape}`
  );

  // Save the SVG to a file
  fs.writeFile('logo.svg', captcha.data, (err) => {
    if (err) throw err;
    console.log('Logo saved!');

    // Convert the SVG to an image file
    svg2img(captcha.data, (error, buffer) => {
      if (error) throw error;
      fs.writeFile('logo.png', buffer, (err) => {
        if (err) throw err;
        console.log('Logo image saved!');
      });
    });
  });
});
