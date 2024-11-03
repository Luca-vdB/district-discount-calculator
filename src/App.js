import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const districts = [
    "Holy Site",
    "Campus",
    "Encampment",
    "Harbor",
    "Aerodrome",
    "Commercial Hub",
    "Entertainment Complex",
    "Theater Square",
    "Industrial Zone",
    "Government Plaza",
    "Water Park",
    "Preserve",
    "Diplomatic Quarter",
  ];

  const icons = districts.map(district => {
    const iconName = district.replace(/\s+/g, "_") + "_(Civ6).webp";
    return `${process.env.PUBLIC_URL}/icons/${iconName}`;
  });

  const [unlockedDistricts, setIsUnlocked] = useState(
    Array(districts.length).fill(false)
  );

  const [placedDistricts, setPlacedDistricts] = useState(
    Array(districts.length).fill(0)
  );
  const [completedDistricts, setCompletedDistricts] = useState(
    Array(districts.length).fill(0)
  );
  const [isDiscounted, setDiscountStatus] = useState(
    Array(districts.length).fill(false)
  );

  
  useEffect(() => {
    const A = unlockedDistricts.filter(Boolean).length; //Number of unlocked districts
    const B = completedDistricts.reduce((accumulator, currentValue) => accumulator + currentValue, 0); //number of completed districts
    console.log(A, B);
    
    const cond1 = B >= A;
    const updatedDiscountStatus = placedDistricts.map((C, index) => {
      const condition2 = C < B / A;
      return cond1 && condition2;
    });
    setDiscountStatus(updatedDiscountStatus);
  },[unlockedDistricts, placedDistricts, completedDistricts]);

  const handleUnlockChange = (index) => {
    const updatedUnlockedDistricts = [...unlockedDistricts];
    updatedUnlockedDistricts[index] = !updatedUnlockedDistricts[index];
    setIsUnlocked(updatedUnlockedDistricts);

    if (!updatedUnlockedDistricts[index]){
      const updatePlacedDistricts = [...placedDistricts];
      updatePlacedDistricts[index] = 0;
      setPlacedDistricts(updatePlacedDistricts)

      const updatedCompleteDistricts = [...completedDistricts];
      updatedCompleteDistricts[index] = 0;
      setCompletedDistricts(updatedCompleteDistricts)
    }
  };

  const incrementPlacedDistricts = (index) => {
    if (!unlockedDistricts[index]) {
      handleUnlockChange(index);
    }
    const updatePlacedDistricts = [...placedDistricts];
    updatePlacedDistricts[index] += 1;
    setPlacedDistricts(updatePlacedDistricts);
  };

  const decrementPlacedDistricts = (index) => {
    const updatePlacedDistricts = [...placedDistricts];
    if (placedDistricts[index] > 0) {
      updatePlacedDistricts[index] -= 1;
      setPlacedDistricts(updatePlacedDistricts)
    }
  };

  const incrementCompletedDistricts = (index) => {
    if (!unlockedDistricts[index]) {
      handleUnlockChange(index);
    }
    const updatedCompleteDistricts = [...completedDistricts];
    updatedCompleteDistricts[index] += 1;
    if (updatedCompleteDistricts[index] > placedDistricts[index]){
      const updatePlacedDistricts = [...placedDistricts];
      updatePlacedDistricts[index] += 1;
      setPlacedDistricts(updatePlacedDistricts);
    }
    setCompletedDistricts(updatedCompleteDistricts);
  };
  const decrementCompletedDistricts = (index) => {
    const updatedCompleteDistricts = [...completedDistricts];
    if (completedDistricts[index] > 0) {
      updatedCompleteDistricts[index] -= 1;
      setCompletedDistricts(updatedCompleteDistricts);
    }
  };
  

  return (
    <div>
      <center>
      <table>
        <thead>
          <tr>
          <th>District</th>
          <th>Unlocked</th>
          <th> Placed</th>
          <th> Completed</th>
          <th> Discounted</th>
          </tr>
        </thead>
        <tbody>
      {districts.map((district, index) => (
      <tr key={index}>
        <td>
        <img src={icons[index]}
             width="32"
             height="32"
        />
        {district}
        </td>
        <td>
          <input
            type="checkbox"
            checked={unlockedDistricts[index]}
            onChange={() => handleUnlockChange(index)}
            style={{width: "20px", height: "20px"}}
        />
        </td>
        <td>
          <button onClick={() =>decrementPlacedDistricts(index)}> &lt; </button>
          <input
            value={placedDistricts[index]}
            readOnly
            style={{width: "40px", textAlign: "center"}}
            />
          <button onClick={() => incrementPlacedDistricts(index)}> &gt; </button>
        </td>
        <td>
          <button onClick={() =>decrementCompletedDistricts(index)}> &lt; </button>
          <input
            value={completedDistricts[index]}
            readOnly
            style={{width: "40px", textAlign: "center"}}
            />
          <button onClick={() => incrementCompletedDistricts(index)}> &gt; </button>
        </td>
        <td>
        {isDiscounted[index] ? "Yes" : "No"}
        </td>
        </tr>
      ))}
      </tbody>
      </table>
      </center>
    </div>
  );
}

export default App;
