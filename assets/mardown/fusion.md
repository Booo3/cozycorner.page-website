# Fusion
### a more unreal fuel than diesel

### Collection of scripts to help port payday2 diesel maps to unreal engine

> #### Disclaimer this stuff is not really polished, mainly for self use, use at own discretion 

## Overview

### Needed software
[PAYDAY 2 Model Tool](https://github.com/kythyria/payday2-model-tool/releases)
[PAYDAY-2-Hashlist](https://github.com/Luffyyy/PAYDAY-2-Hashlist)
[DieselBundleViewer](https://github.com/Luffyyy/DieselBundleViewer)
[BeardLib-Editor](https://github.com/Luffyyy/BeardLib-Editor)
[Blender](https://www.blender.org/)
[Python]

### If you want to use this to port maps to payday3 you will need imagemagick because the .dds files need to be converted to .png because UE 4.7 cant import .dds files
[imagemagick](https://imagemagick.org/script/download.php#windows)


### pdworld2json.py
Converts world.continent files to the json format and fixes location rotation to work with unreal.

### ConvertExportedToUnreal.blend
Fixes Model files exported by the PD2ModelParser, like removing unneeded objects rotating models propely and setting the origin corectly.

### ExportModels.bat
Makes it easier to export models by just letting it run via a bat in the background

### ModelCopyForBlender.bat
Makes it easier to set up a work folder for blender

## Get started

### Download the project files.

Download files by using Download ZIP

![](/assets/images/DWL1.png)

Extract the contents, make sure you have enough space for the game assets later. The extracted game assets are quite large.

### Export Level data
Install [DieselBundleViewer](https://github.com/Luffyyy/DieselBundleViewer) and open payday2s bundle_db.blb
Open DieselBundleViewer

![](/assets/images/DBV1.png)

Open bundle_db.blb

![](/assets/images/DBV2.png)

Navigate to /levels/narratives and choose a map to port, in my case First World Bank

Navigate to /levels/narratives/classics/red2

![](/assets/images/DBV3.png)

Then go into the world folder

![](/assets/images/DBV4.png)

Press Convert and Save as

![](/assets/images/DBV5.png)

Then save it on the /WorldFiles/DieselWorldCONTINENT

![](/assets/images/DBV6.png)

### Get started with pdworld2json.py

Install python

Open a Powershell Terminal and write python3

![](/assets/images/IP31.png)

It should open the windows store, hit install and let it finish installing python

![](/assets/images/IP32.png)

After the install make sure if it is installed

![](/assets/images/IP33.png)

You can also just install it a different way this is just the easiest personally.

Next install the requirements using requirements.txt

Open a Powershell Terminal in the Folder you extracted the project files.

Then use the command 

```
pip install -r requirements.txt
```
![](/assets/images/PDWJ1.png)

Next run this command to convert the world.continent to a json

```
python .\pdworld2json.py
```

![](/assets/images/PDWJ2.png)

You should have a world.json like this

![](/assets/images/PDWJ3.png)

**It should also have printed out what files you will need to export you will need to remember that**
![](/assets/images/PDWJ4.png)

### Export the needed assets from the game

Go back to Diesel Bundle Viewer and navigate to /units

![](/assets/images/EXPF1.png)

Export the needed files Printed out by pdworld2json.py (In my case it is pd2_dlc_red, pd2_dlc_drive, pd2_dlc1, payday2, pd2_dlc_arena, pd2_dlc_eng, units, pd2_dlc2, vehicles, pd2_dlc_casino, lights, world, equipment, dev_tools, pd2_mcmansion)

Mark them Right Click and Press save as and save them in your project folder in a folder called "units"

![](/assets/images/EXPF2.png)

### Convert .model files in the unit folder and make them ready for blender

Make sure to download [PAYDAY 2 Model Tool](https://github.com/kythyria/payday2-model-tool/releases) [PAYDAY-2-Hashlist](https://github.com/Luffyyy/PAYDAY-2-Hashlist)

Extract PD2ModelParser.exe like this

![](/assets/images/TMF1.png)

Next extract the hashlist in the root of the PD2ModelParser.exe this is very important or else the rest will not work

![](/assets/images/TMF2.png)

If all is done right just open ExportModels.bat and it should export the models. It will take a bit for it to finish so sit back and relax.

You can also use this, it is faster, but I found if it encounters an error it will crash, and not export the rest, using the .bat makes if it encounters an error it will just continue.
```
.\PD2ModelParser.exe --batch-export=VALUE
```

After it has finished, we need to sort the data for the next step, so open ModelCopyForBlender.bat

It should have created 2 more folders output and textures, and copied the data needed for blender.

### Fixing the models using blender and a script
### **Depending on what engine you will port to stuff is now gonna change remember to install imagemagick if you plan to use UE4**

### For Unreal 4 users run UE4_ConvertTextureFiles to convert the texture files to .PNGs

```
python .\UE4_ConvertTextureFiles.py
```

Now we should have a bunch of models inside output with the proper folder structure but they are not really usable in unreal.

So download [Blender](https://www.blender.org/) if you haven't already and open ConvertExportedToUnreal.blend.

If for some reason you cant open the .blend file anymore, you can just make a new project and load the blender scripts

![](/assets/images/B1.png)

Chose the right script for what engine UE4 or UE5
![](/assets/images/B3.png)

If up to this point you have done everything correct you should be able to hit the run script button, and wait for it to finish. It will take a while depending of the amount of files you have. Blender will lag but don't  worry.

![](/assets/images/B2.png)

When done it should have created a folder called "done" there you will find the fixed models and if you had the textures properly setup they should have applied too. 
(Sometimes Overkill uses textures outside dlc folder so there will be missing textures I will have to fix that)

### Importing models into unreal

Because the amount of data to import is so huge unreal sometimes likes to crash so I made 2 scripts (One for UE4 and UE5) to help with that, you might need an auto clicker because you will need to press import a lot with it.

Run python scripts in UE5

![](/assets/images/UEPY1.png)

And UE4

![](/assets/images/UEPY2.png)

Now suffer though the slow import, this will by far take the longest time so get compfy

### Importing map data

Ok you done it all, homestretch. Now make sure to add the Files from the "UnrealEditorFiles/" Folder into your project. 

![](/assets/images/UEPY3.png)

Reload the project now try to drag the world.json into the Content Browser It should pop up with a json import window, select the DataTable Row Type to be PDWorldJson and hit apply

![](/assets/images/MIPU.png)

Next open the level spawner widget like this

![](/assets/images/MIPU2.png)

Choose the map files and hit spawn map

![](/assets/images/MIPU3.png)

### Profit???

Well now you've done it, I hope at least. When anything goes wrong don't worry, read over this ReadMe. 

If you cant figure it out come and reach out to me i'll try to hep as best I can. 

You can find me on discord under boo3

![](/assets/images/discord.png)