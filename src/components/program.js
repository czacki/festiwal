//"jak coś jest głupie, ale działa, to nie jest głupie" + jeszcze tak dobrze nie ogarniam Reacta xd
import React, {useState, useEffect} from 'react'
let data=require("./sztuki")
let festiwalStart=new Date(...data.start).getTime()
let dayMs=3600*24*1000
export default function Program()
{
  let days=data.days
  let sztuki=new Array(days.length)
  sztuki.fill([])
  for(let sztuka of data.sztuki)
  {
    let [hour, minutes]=sztuka.oclock.split(":")
    sztuka.timestamp=festiwalStart+sztuka.day*dayMs+parseInt(hour)*3600*1000+parseInt(minutes)*60000
    sztuki[sztuka.day]=[...sztuki[sztuka.day], sztuka]//czemu nie działa push?
  }

  let now=new Date()
  let realDay=Math.floor((Date.now()-festiwalStart)/dayMs)
  const [day, setDay]=useState(Math.min(3, Math.max(realDay, 0)))
  const [playNow, updatePlay]=useState(-1)
  let isFestiwal=(day===realDay)
  function updateDay()
  {
    realDay=Math.floor((Date.now()-festiwalStart)/dayMs)
    setDay(Math.min(3, Math.max(realDay, 0)))
    setPlayNumber()
    now=new Date()
    setTimeout(updateDay, (new Date().setHours(24, 0, 0, 0)-new Date()))
  }
  useEffect(()=>
  {
    updateDay()
  }, [])//sory za warning

  //czy aktualizować automatycznie jak się zmieni dzień?

  function nextPlay()
  {
    now=new Date()
    if(playNow===sztuki[realDay].length-1||playNow===-1)
    {
      updatePlay(-1)
      return
    }
    updatePlay(playNow+1)
    if(playNow===sztuki[realDay].length-2)setTimeout(nextPlay, sztuki[realDay].slice(-1)[0].timestamp+3600*1000-now)
    else setTimeout(nextPlay, sztuki[realDay][playNow+1].timestamp-now)
  }

  function setPlayNumber()
  {
    if(!isFestiwal)
    {
      updatePlay(-1)
      return
    }
    let tplays=sztuki[realDay]
    if(tplays.length===0)
    {
      updatePlay(-1)
      return
    }
    now=new Date()
    if(now<tplays[0].timestamp)
    {
      updatePlay(-1)
      setTimeout(nextPlay, tplays[0].timestamp-now)
      return
    }
    if(now>tplays.slice(-1)[0].timestamp+3600*1000)
    {
      updatePlay(-1)
      return
    }
    let p=tplays.findIndex(x=>x.timestamp>now)
    if(p===-1)p=tplays.length
    --p
    updatePlay(p)
    if(p===tplays.length-1)setTimeout(nextPlay, tplays.slice(-1)[0].timestamp+3600*1000-now)
    else setTimeout(nextPlay, tplays[p+1].timestamp-now)
  }
  return (
    <div>
      {
        days.map((d, i)=>
        (
          <div key={d} className={i===day ? "active" : null} onClick={()=>setDay(i)}>{d}</div>
        ))
      }
      <table>
        <tbody>
          <tr>
            <th>Godzina</th>
            <th>Nazwa</th>
            <th>Klasa</th>
          </tr>
          {
            sztuki[day].map((s, i)=>
            (
              <tr key={`${s.name}${s.class}`} className={i===playNow&&day===realDay ? "now" : null}>
                <td>{s.oclock}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.timestamp}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
