var sounds={
    'a':new Howl({src: ['sounds/a.mp3']}),
    'b':new Howl({src: ['sounds/b.mp3']}),
    'c':new Howl({src: ['sounds/c.mp3']}),
    'd':new Howl({src: ['sounds/d.mp3']}),
    'e':new Howl({src: ['sounds/e.mp3']}),
}
// var sound = new Howl({
//     src: ['sounds/a.mp3']
//   });
  
//   sound.play();

function playSound(letter){
    sounds[letter].play()
}

function handleKey(event){
    let k=event.key
    if(k in sounds){
        playSound(k)
    } else {
        console.log('no sound for '+k )
    }
}
