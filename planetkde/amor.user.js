// ==UserScript==
// @name           amor
// @namespace      http://www.vandenoever.info/software/amor
// @description    a cute animal that runs around on your webpage.
// @include        http:
// @resource       ghost_png file:///usr/share/kde4/apps/amor/pics/preview/ghost.png
// ==/UserScript==

// wrap the entire functionality in an anonymous function
(function() {
window.addEventListener("load", function(ev) {

var characters = {
  "Spooky Ghost": {
    basePath: 'ghost/',
    initialState: 'invisible',
    states: {
      invisible: {
        lifetime: 1000,
        transitions: {
          timeStep: {
            appear: {
              target: 'appear1',
              transition: function() {
                moveToNewPosition();
              }
            }
          }
        }
      },
      appear1: {
        icon: 'ghost_z1.png',
        transitions: { timeStep: { step: { target: 'appear2' } } }
      },
      appear2: {
        icon: 'ghost_z2.png',
        transitions: { timeStep: { step: { target: 'appear3' } } }
      },
      appear3: {
        icon: 'ghost_z3.png',
        transitions: { timeStep: { step: { target: 'appear4' } } }
      },
      appear4: {
        icon: 'ghost_z4.png',
        transitions: { timeStep: { step: { target: 'appear5' } } }
      },
      appear5: {
        icon: 'ghost_z5.png',
        transitions: { timeStep: { step: { target: 'base1' } } }
      },
      disappear1: {
        icon: 'ghost_z5.png',
        transitions: { timeStep: { step: { target: 'disappear2' } } }
      },
      disappear2: {
        icon: 'ghost_z4.png',
        transitions: { timeStep: { step: { target: 'disappear3' } } }
      },
      disappear3: {
        icon: 'ghost_z3.png',
        transitions: { timeStep: { step: { target: 'disappear4' } } }
      },
      disappear4: {
        icon: 'ghost_z2.png',
        transitions: { timeStep: { step: { target: 'disappear5' } } }
      },
      disappear5: {
        icon: 'ghost_z1.png',
        transitions: { timeStep: { step: { target: 'invisible' } } }
      },
      melt1: {
        icon: 'ghost_m1.png',
        transitions: { timeStep: { step: { target: 'melt2' } } }
      },
      melt2: {
        icon: 'ghost_m2.png',
        transitions: { timeStep: { step: { target: 'melt3' } } }
      },
      melt3: {
        icon: 'ghost_m3.png',
        transitions: { timeStep: { step: { target: 'melt4' } } }
      },
      melt4: {
        icon: 'ghost_m4.png',
        transitions: { timeStep: { step: { target: 'melt5' } } }
      },
      melt5: {
        icon: 'ghost_m5.png',
        transitions: { timeStep: { step: { target: 'melt6' } } }
      },
      melt6: {
        icon: 'ghost_m6.png',
        transitions: { timeStep: { step: { target: 'melt7' } } }
      },
      melt7: {
        icon: 'ghost_m7.png',
        transitions: { timeStep: { step: { target: 'melt8' } } }
      },
      melt8: {
        icon: 'ghost_d3.png',
        transitions: { timeStep: { step: { target: 'invisible' } } }
      },
      base1: {
        icon: 'ghost_1.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            disappear: {
              target: 'disappear1',
              likelyhood: 0.03
            },
            melt: {
              target: 'melt1',
              likelyhood: 0.03
            },
            glideRight: {
              target: 'glideRight1',
              likelyhood: 0.2
            },
            glideLeft: {
              target: 'glideLeft1',
              likelyhood: 0.2
            },
            toEyes: {
              target: 'toEyes1',
              likelyhood: 0.2
            },
            move: {
              target: 'base2'
            }
          },
          scroll: { disappear: { target: 'invisible' } }
        }
      },
      base2: {
        icon: 'ghost_2.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            disappear: {
              target: 'disappear1',
              likelyhood: 0.1
            },
            move: {
              target: 'base1'
            }
          },
          scroll: { disappear: { target: 'invisible' } }
        }
      },
      glideRight1: {
        icon: 'ghost_1.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            move: {
              target: 'glideRight2',
              move: {dx:4},
              likelyhood: 0.7
            },
            base: {
              target: 'base1'
            }
          }
        }
      },
      glideRight2: {
        icon: 'ghost_2.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            move: {
              target: 'glideRight1',
              move: {dx:4}
            }
          }
        }
      },
      glideLeft1: {
        icon: 'ghost_1.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            move: {
              target: 'glideLeft2',
              move: {dx:-4},
              likelyhood: 0.7
            },
            base: {
              target: 'base1'
            }
          }
        }
      },
      glideLeft2: {
        icon: 'ghost_2.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            move: {
              target: 'glideLeft1',
              move: {dx:-4}
            }
          }
        }
      },
      toEyes1: {
        icon: 'ghost_e.png',
        transitions: { timeStep: { move: { target: 'toEyes2' } } }
      },
      toEyes2: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'toEyes3',
              move: {dy:5}
            }
          }
        }
      },
      toEyes3: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'toEyes4',
              move: {dy:5}
            }
          }
        }
      },
      toEyes4: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'eyes',
              move: {dy:5}
            }
          }
        }
      },
      fromEyes1: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'fromEyes2',
              move: {dy:-5}
            }
          }
        }
      },
      fromEyes2: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'fromEyes3',
              move: {dy:-5}
            }
          }
        }
      },
      fromEyes3: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            move: {
              target: 'base1',
              move: {dy:-5}
            }
          }
        }
      },
      eyes: {
        icon: 'ghost_e.png',
        lifetime: 300,
        transitions: {
          timeStep: {
            left: {
              target: 'eyesLeft',
              likelyhood: 0.5,
              move: {dx:-12}
            },
            right: {
              target: 'eyesRight',
              move: {dx:12}
            }
          }
        }
      },
      eyesLeft: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            stop: {
              target: 'fromEyes1',
              likelyhood: 0.3
            },
            move: {
              move: {dx:-12}
            }
          }
        }
      },
      eyesRight: {
        icon: 'ghost_e.png',
        transitions: {
          timeStep: {
            stop: {
              target: 'fromEyes1',
              likelyhood: 0.3
            },
            move: {
              move: {dx:12}
            }
          }
        }
      }
    }
  }
};

var amorHeight = 32;
var amorWidth = 32;
var defaultTimeStepSize = 100;

var amor = new Object();
amor.character = "Spooky Ghost";

var displayAlerts = true;
function alert(msg) {
  if (displayAlerts) {
     if (!confirm(msg)) {
       displayAlerts = false;           
     }
  }
}

/**
 * return Y coordinate in the viewport for placing
 * the amor.
 **/
function getY(e) {
    var top = -window.scrollY;
    var p = e;
    while (p != null && p.offsetParent != null) {
        top += p.offsetTop;
        p = p.offsetParent;
    }
    if (top < amorHeight || top > window.innerHeight) {
        return -1;
    }
    return top - amorHeight;
}

function getMinX(e) {
    var left = -window.scrollX;
    var p = e;
    while (p != null && p.offsetParent != null) {
        left += e.offsetLeft;
        p = p.offsetParent;
    }
    return left;
}

function getMaxX(e) {
    var left = -window.scrollX;
    var p = e;
    while (p.offsetParent != null) {
        left += e.offsetLeft;
        p = p.offsetParent;
    }
    return left + e.clientWidth - amorWidth;
}

function getElement() {
    var elements = document.evaluate('/html/body//*',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var count = 0;
    do {
        var i = Math.round(Math.random()*(elements.snapshotLength-1));
        var e = elements.snapshotItem(i);
        var y = getY(e);
        if (y >= 0) {
            var min = getMinX(e);
            var max = getMaxX(e);
            if (min >= 0 && max >= 0) {
                return e;
            }
        }
    } while (++count < 1000);
    return null;
}

function addImage() {
    var img = document.createElement('img');
    img.style.position = 'fixed';
    var body = document.body;
    if (body == null) {
        body = document.firstChild;
    }
    body.insertBefore(img, body.firstChild);
    return img;
}

function moveToNewPosition() {
    var img = amor.img;
    var e = getElement();
    if (e == null) {
        return;
    }
    var x = getMinX(e);
    x = x + (getMaxX(e)/2 - x) * Math.random();
    var y = getY(e);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
}

function move(dx, dy) {
    var img = amor.img;
    if (dx != null) {
        var x = parseInt(img.style.left, 10) + dx;
        img.style.left = x + 'px';
    }
    if (dy != null) {
        var y = parseInt(img.style.top, 10) + dy;
        img.style.top = y + 'px';
    }
}

function setTimeout() {
    window.clearTimeout(amor.timeoutId);
    amor.timeoutId = window.setTimeout(handleTimeStep, amor.timeStepSize);
}

function handleEvent(eventName) {
    var state = characters[amor.character].states[amor.state];
    var transitions = state.transitions[eventName];
    if (transitions == null || transitions.length == 0) {
        setTimeout();
        return;
    }   
    var random = Math.random();
    var sum = 0;
    for (var i in transitions) {
        var transition = transitions[i];
        if (transition.likelyhood == null) {
            sum += 1;
        } else if (typeof transition.likelyhood == 'function') {
            sum += transition.likelyhood();
        } else {
            sum += transition.likelyhood;
        }
        if (sum > random) {
            if (transition.transition != null) {
                transition.transition();
            }
            if (transition.move != null) {
                move(transition.move.dx, transition.move.dy);
            }
            if (transition.target != null) {
                setState(transition.target);
            }
            break;
        }
    }
    setTimeout();
}
function setState(stateName) {
    amor.state = stateName;
    var character = characters[amor.character];
    var state = character.states[stateName];
    var icon = state.icon;
    if (icon == null) {
        amor.img.style.visibility = 'hidden';
    } else {
        amor.img.style.visibility = 'visible';
        amor.img.src = character.basePath + icon;
    }
    if (state.lifetime == null) {
        amor.timeStepSize = defaultTimeStepSize;
    } else {
        amor.timeStepSize = state.lifetime;
    }
}

function handleTimeStep() {
    handleEvent("timeStep");
}
function handleScroll() {
    handleEvent("scroll");
}
function validateCharacter(characterName, character) {
    if (character.states == null) {
        alert(characterName + 'has no states.');
    }
    if (character.states[character.initialState] == null) {
        alert(characterName + ' has no initialState.');
        return;
    }
    for (var s in character.states) {
        for (var t in character.states[s].transitions) {
            t = character.states[s].transitions[t];
            for (var e in t) {
                if (t[e].target != null
                        && character.states[t[e].target] == null) {
                    alert('Character ' + characterName + ' has no state '
                        + t[e].target + '.');
                }
            }
        }
    }
}
function validateCharacters() {
  for (var c in characters) {
    validateCharacter(c, characters[c]);
  }
}

validateCharacters();

amor.img = addImage();
setState(characters[amor.character].initialState);
amor.timeoutId = window.setTimeout(handleTimeStep, amor.timeStepSize);
window.addEventListener('scroll', handleScroll, false);

// end of the anonymous function
 }, false);
})();
