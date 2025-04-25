import CaseCard, { Case } from "./CaseCard";

const CaseGrid = ({ 
  cases, 
  onCaseClick 
}: { 
  cases: Case[],
  onCaseClick: (caseId: string) => void 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cases.map((caseItem) => (
        <CaseCard 
          key={caseItem.id} 
          caseItem={caseItem} 
          onClick={() => onCaseClick(caseItem.id)} 
        />
      ))}
    </div>
  );
};

export default CaseGrid;
