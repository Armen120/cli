import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import readline from 'node:readline/promises'
import os from 'os';



process.stdin.setEncoding('utf8');

const rl = readline.createInterface({ input, output })

rl.setPrompt(`Welcome ${os.userInfo().username}! \n`);
rl.prompt();

rl.on('line', (input) => {
  switch (input) {
    case '.exit':
      console.log(`Thank you ${os.userInfo().username}, goodbye!`);
      process.exit();
    case 'os --cpus':
      console.log(os.cpus());

      break;
    case 'os --homedir':
      console.log(os.homedir());

      break;
    case 'os --username':
      console.log(os.userInfo().username);

      break;
    case 'os --architecture':
      console.log(os.arch());

      break;
    case 'os --hostname':
      console.log(os.hostname());

      break;
    case 'os --platform':
      console.log(os.platform());

      break;
    case 'os --memory':
      console.log(os.totalmem());

      break;

    case 'ls':
      fs.readdir('./', { recursive: true }, (err, files) => {
        if (err) {
          console.log(err);
        }

        let sorFiles = lodash.sortBy(files)
        console.log(files)
        let k = 0;
        sorFiles.forEach((ite, i) => {
          fs.stat('./' + ite, (err, item) => {
            if (item.isDirectory()) {
              console.log(k++, ite, 'is Directory')
            }

          })

        })
        sorFiles.forEach((ite, i) => {
          fs.stat('./' + ite, (err, item) => {
            if (item.isFile()) {
              console.log(k++, ite, 'is File')
            }

          })

        })

      })
      break;

    case 'add new_file_name':
      console.log('write file name')
      rl.on('line', (input) => {
        fs.writeFile(path.join(process.cwd(), input), '', (err) => {
          if (err) {
            console.log(err)
          }
        })
      })
      break;

    case 'rn path_to_file new_filename':
      console.log('write the old name of file');
      rl.on('line', (input) => {
        console.log('write the new name of file');
        rl.on('line', (newInput) => {
          fs.rename(path.join(process.cwd(), input), path.join(process.cwd(), newInput), (err) => {
            if (err) {
              console.log(err);
            }
          })
        })

      })
      break;

    case 'cp path_to_file path_to_new_directory':
      console.log('write file name');
      rl.on('line', (input) => {
        console.log('write copy name');
        rl.on('line', (newInput) => {
          fs.copyFile(input, newInput, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })

      })
      break;

    case 'mv path_to_file path_to_new_directory:':
      console.log('write file name');
      rl.on('line', (input) => {
        console.log('write directory name');
        rl.on('line', (newInput) => {
          fs.rename(path.join(process.cwd(), input), path.join(process.cwd(), newInput, input), (err) => {
            if (err) {
              console.log(err);
            }
          })
        })

      })
      break;

    case 'rm path_to_file':
      console.log('write file name');
      rl.on('line', (input) => {
        fs.readdir('./', { recursive: true }, (err, files) => {
          if (err) {
            console.log(err);
          }
          delFile(files, input);
        })
      })
      break;
    // default:
    //     console.log('invalid input');

    //     break;

  }
})

  function delFile(files, input) {
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        fs.readdir(files[i], (er, item) => {
          if (item !== undefined && item.length !== 0) {
            if (item.some((element) => element == input)) {
              for (let j = 0; j < item.length; j++) {
                fs.unlink(path.join(process.cwd(), files[i], input), (err) => console.error(err))
              }
            } else {
              delFile(item.map((item) => path.join(files[i], item)), input);
            }
          }
        })
      }
    }
  }





