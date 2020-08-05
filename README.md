# Nonogram Solver
A script that can solve any sized nonogram puzzle on the website [puzzle-nonograms.com](https://www.puzzle-nonograms.com). It uses the information provided by the website's **Game** object to solve and submit any given puzzle in a similar way to how a human would, only much faster. This is opposed to solving it recursively, which would be less time efficient for larger puzzles (something like O(2^n), n being number of squares). 

If you don't know what this game is or how it works, check out [this tutorial](https://www.puzzles-mobile.com/nonograms/tutorial)!

## Setup
1. Launch [puzzle-nonograms.com](https://www.puzzle-nonograms.com)
2. Open the developer console by pressing *Ctrl+Shift+i* (Windows) or *Cmd+Option+i* (Mac)
3. On the top menu select 'Sources,' then on the lefthand navigator select 'Snippets' (you may need to extend the tab to see it)
4. Hit 'New Snippet,' call it whatever you'd like (*ex: solver*), then copy-and-paste all the code from [solver.js](https://github.com/Filupnot/js-nonogram/blob/master/solver.js) into your new snippet (you'll only have to do this once, and it will be accessable whenever you visit the page)
5. You're done!

## Usage
Start a new game by choosing any size on the lefthand column (*ex: 15x15 Nonograms*). When the game is loaded, right-click your new snippet and hit 'run.' Ta-da! 

**EDIT:** Upon submitting a couple scores to the Hall of Fame for a laugh, the creator of the game sent me this email a week later: 

> Hi,  
> Good job with the solver. I had to remove your scores though :)  
> I hope you understand.  
> There is a special hall of fame for robots - https://www.puzzle-nonograms.com/hall_robots.php?hallsize=0  
> You can find more instructions in the HTML code.  
> Cheers

So I urge you to *NOT* submit your scores to the general leaderboards as to respect the game's community and the website's authenticity. Thank you!

If you enounter any issues, please report an issue with a screenshot of the puzzle / explanation of the context of the problem. Or submit a pull request!

<sup>~ This repository was created by Philip Knott in July, 2020 ~</sup>
