//"jak coś jest głupie, ale działa, to nie jest głupie" + jeszcze tak dobrze nie ogarniam Reacta xd
import React, {useState, useEffect} from 'react'
let data//TODO wziąć z bazy
try
{
  data=require("../assets/plays")
}
catch(e)
{
  data={"start": [2020, 11, 2], "days": ["Środa", "Czwartek", "Piątek", "Sobota"], "plays": []}
}

let festivalStart=new Date(...data.start).getTime()
const hourMs=3600*1000
const dayMs=hourMs*24
const maxPlayLength=5/6*hourMs
export default function Program()
{
  let days=data.days//nazwy dni festiwalu
  let realDay=Math.floor((Date.now()-festivalStart)/dayMs)//teraz-start festiwalu w dniach
  const [day, showDay]=useState(Math.min(days.length-1, Math.max(0, realDay)))//który dzień jest teraz pokazywany
  let plays=data.plays
  //sztuki muszą być posortowane
  for(let i=0; i<plays.length; ++i)
  {
    plays[i].id=i
    //przetwarzam godzinę i dzień sztuki na timestamp (bo łatwiej do danych wklepać tylko godzinę i dzień)
    let [hour, minutes]=plays[i].oclock.split(":")
    plays[i].timestamp=festivalStart+plays[i].day*dayMs+parseInt(hour)*hourMs+parseInt(minutes)*60000
  }

  //która sztuka teraz trwa?
  const [playNow, newPlayNow]=useState(-1)

  function init()
  {
    let now=Date.now()
    for(let i=0; i<plays.length; ++i)
    {
      if(plays[i].timestamp-now>0)setTimeout(()=>{newPlayNow(plays[i].id)}, plays[i].timestamp-now)//początki sztuk
      if(i<plays.length-1&&plays[i+1].timestamp<plays[i].timestamp+maxPlayLength)continue//jeśli następna sztuka zaczyna się wcześniej niż maksymalna długość sztuki to już nic nie rób
      if(plays[i].timestamp+maxPlayLength-now>0)setTimeout(()=>{newPlayNow(-1)}, plays[i].timestamp+maxPlayLength-now)//przerwy
    }
    let p=plays.findIndex(x=>x.timestamp<=now&&now<x.timestamp+maxPlayLength)
    newPlayNow(p)
  }
  useEffect(init, [])
  return (
    <div>
      {
        days.map((d, i)=>
        (
          <div key={d} className={i===day ? "activeDay" : null} onClick={()=>showDay(i)}>{d}</div>
        ))
      }
      <table>
        <tbody>
          <tr>
            <th>Godzina</th>
            <th>Sztuka</th>
            <th>Klasa</th>
          </tr>
          {
            plays.filter(x=>x.day===day).map((s, i)=>
            (
              <tr key={`s${s.id}`} className={s.id===playNow&&day===realDay ? "now" : null}>
                <td>{s.oclock}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
