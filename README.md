# KcMaster App

This is a single page application that helps you calculate a chemical equilibrium constant (usually known as Kc).

## What is KcMaster

Chemistry is not easy, and many AP Chem students strugle to understand all the terms and concepts that are tought in this subject. One of them is the concept of the equilibrium constant (aka Kc). As an AP Chemistry student you are usually asked to calculate the value of this constant when given final concentration of the products of a reaction, or even more challenging, to calcute the final concentrations when given the Kc. KcMaster is a single page application designed to help students do this two calculations, mimicking the same technique they usually do at school (via an Initial, Change, Equilibrium chart). 

Given the initial concentration of the reactants, KcMaster can calculate the Kc given one of the products' concentration at equilibrium or calculate the products conentration at equilibrium if given the Kc. This two calculations are the most commonly asked in AP chemistry regarding the equilibrium constant (Kc).

This application is a single web application built entirely using React.js 

## Getting started!

In case you just want to use the app without having it to use github, it is worth to know that the latest version of this app is being uploaded at: https://kc-master-201c9.web.app/

In case you want to use the app in localhost, please follow this structions:

1) First step is to clone the repository. Cloning the repository to your github account is a very standar procedure, so I will not detail how to do it. In case you need help or have any issue in this step, please check the github information about cloning a repository here: https://docs.github.com/es/repositories/creating-and-managing-repositories/cloning-a-repository

2) Once you have cloned the repository, and since this is an app built entirely on react, you should install the node modules needed to make it work. To do so use the terminal to navigate to the folder of the cloned repository and run the following snippet: 
```
-npm install
```

3) Once all the dependencies have been installed you can start the app using:
```
-npm start
```

This app runs on port 3000. The browser should automatically open with the app when -npm start is run. In case it does not, access http://localhost:3000 in your browser to view it directly. 

## Understanding the application

There are two basic calculations this application is able to make:

1) Calculate the Kc using the concentrations at equilibrium.
2) Calculate the concentrations at equilibrium using the Kc.

For both calculations the procedure is very similar, please follow the following steps:

1) First step is to introduce the chemical reaction that is taking place. To do so add the reactants and products using the big buttons labled with a (+) sign. Add the stechiometric number and name of the compound as well as its state (solid, liquid, gas, aqueous). In case you want to delete one just click on the trash button next to it. 

Before moving to step 2 make sure that the chemical equation that is shown is the correct one.

Note that if no reactants or products are added the application will not show any other part. 

2) An initial ICE (Initial Change Equilibrium) chart should have appeard. Please introduce the initial concentration of the reactants. Then introduce either one concentration at the Equilibrium row of the ICE or the Kc.

When given an equilibrium concentration a new final ICE chart should show up, and below it the value of the Kc is shown. 

If, instead, it is given the Kc, a button with the text 'apply Kc' should show up. When pressed a modal will show up and you will be asked to solve for x in a given equation. In case you need it, the 'solve with wolpramalpha' will give you the solution to this equation. Once introduced the value for x press the right arrow button next to the input and on the right side of the screen a new 'final ICE' chart will appear showing the concentration of each product and reactant at equilibrium. 



I strongly encourage all of you to use the app as much as you like and in case you see something that can be improved, feel free to do a pull request. 
