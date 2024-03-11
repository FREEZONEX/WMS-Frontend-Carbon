'use client';
import React, { useState } from 'react';
import { TextInput, Button, Checkbox, FormGroup, Tile } from '@carbon/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  // Function to handle login form submission
  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <Tile>
            <FormGroup legendText="Log in">
              {/* Step 1 */}
              {email === '' && (
                <>
                  <TextInput
                    id="ibmId"
                    labelText="IBMid"
                    placeholder="jill.a.smith@ibm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Checkbox
                    labelText="Remember ID"
                    id="remember_id"
                    checked={rememberId}
                    onChange={setRememberId}
                  />
                  <Button onClick={() => {}}>Continue</Button>
                </>
              )}

              {/* Step 2 */}
              {email !== '' && (
                <>
                  <TextInput
                    id="password"
                    labelText="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin}>Log in</Button>
                </>
              )}
            </FormGroup>
          </Tile>
        </div>
      </div>
    </div>
  );
}
