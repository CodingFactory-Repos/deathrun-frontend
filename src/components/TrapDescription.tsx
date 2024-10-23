import React from 'react';

type Trap = {
  id: number;
  label: string;
  name: string;
  description: string;
};

type TrapDescriptionProps = {
  trapItem: Trap;
};

const TrapDescription: React.FC<TrapDescriptionProps> = ({ trapItem }) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <div style={styles.icon}>{trapItem.label}</div>
        <div style={styles.name}>{trapItem.name}</div> {/* Icône et nom sur la même ligne */}
      </div>
      <p style={styles.description}>{trapItem.description}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #000',
    borderRadius: '10px',
    padding: '20px',
    width: '350px',
    textAlign: 'justify',
    position: 'relative',
    top: '20px',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',   
    alignItems: 'center',   
    marginBottom: '10px',
    justifyContent: 'flex-start',
    width: '100%',
    
  },
  icon: {
    fontSize: '3rem',      
    marginRight: '10px',   
  },
  name: {
    fontWeight: 'bold' as const,
    fontSize: '1.5rem',    
  },
  description: {
    fontSize: '1rem',
    maxHeight: '150px',    
    overflowY: 'auto',     
    textAlign: 'justify',
  },
};

export default TrapDescription;
