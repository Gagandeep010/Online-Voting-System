import React, { useEffect, useState } from 'react';
import { web3, getElectionContract } from '../../web3.js';
import NavBar from '../Dashboard/Navbar/NavBar.tsx';
import './AdminAddCandidatePage.css';

interface CandidateDetails {
  name: string;
  age: string;
  party: string;
  phone: string;
}

const AdminAddCandidatePage = () => {
  const [candidateName, setCandidateName] = useState('');
  const [age, setAge] = useState('');
  const [party, setParty] = useState('');
  const [phone, setPhone] = useState('');
  const [candidates, setCandidates] = useState([] as CandidateDetails[]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const contract = await getElectionContract();
      const count = parseInt(await contract.methods.candidateCount().call());
      const metadata = JSON.parse(localStorage.getItem('candidate_metadata') || '[]');

      const fetched: CandidateDetails[] = [];

      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.candidates(i).call();
        const meta = metadata.find((m: CandidateDetails) => m.name === candidate.name);

        fetched.push({
          name: candidate.name,
          age: meta?.age || '—',
          party: meta?.party || '—',
          phone: meta?.phone || '—',
        });
      }

      setCandidates(fetched);
    } catch (err) {
      console.error('❌ Failed to fetch candidates:', err);
      setCandidates([]);
    }
  };

  const handleAddCandidate = async () => {
    if (!candidateName || !age || !party || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const contract = await getElectionContract();
      const accounts = await web3.eth.getAccounts();


      await contract.methods.addCandidate(candidateName.trim()).send({ from: accounts[0] });

      const newMeta: CandidateDetails = {
        name: candidateName.trim(),
        age,
        party,
        phone,
      };

      const existingMeta = JSON.parse(localStorage.getItem('candidate_metadata') || '[]');
      const exists = existingMeta.find((c: CandidateDetails) => c.name === newMeta.name);

      if (!exists) {
        existingMeta.push(newMeta);
        localStorage.setItem('candidate_metadata', JSON.stringify(existingMeta));
      }

      setCandidateName('');
      setAge('');
      setParty('');
      setPhone('');
      setMessage(`✅ Candidate "${newMeta.name}" added successfully!`);
      fetchCandidates();
    } catch (err: any) {
      console.error('❌ Error adding candidate:', err.message || err);
      setMessage('❌ Failed to add candidate. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-wrapper">
      <NavBar />
      <div className="admin-container">
        <h1>🗳️ Add Candidate</h1>

        <div className="form-row">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="add-button" onClick={handleAddCandidate} disabled={loading}>
          {loading ? 'Adding...' : '➕ Add Candidate'}
        </button>

        {message && <p className="message">{message}</p>}

        <h2 style={{ marginTop: '2rem' }}>📋 Current Candidates</h2>
        {candidates.length === 0 ? (
          <p>No candidates added yet.</p>
        ) : (
          <div className="candidate-list">
            {candidates.map((c, i) => (
              <div key={i} className="candidate-card">
                <h3>#{i + 1} {c.name}</h3>
                <p><strong>🧓 Age:</strong> {c.age}</p>
                <p><strong>🏛️ Party:</strong> {c.party}</p>
                <p><strong>📞 Phone:</strong> {c.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddCandidatePage;
