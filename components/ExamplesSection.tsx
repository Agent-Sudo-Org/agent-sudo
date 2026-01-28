import React from 'react';
import Section from '@/components/Section';
import CodeExample from '@/components/CodeExample';
import ExampleListSection from '@/components/ExampleListSection';

interface ExamplesSectionProps {
  // no props
}

export default function ExamplesSection() {
  return (
    <Section id="examples" title="Examples" className="py-12" center>
      {/* Wide code example */}
      <div className="mb-4">
        <CodeExample compact />
      </div>

      {/* Repo cards */}
      <ExampleListSection standalone />
    </Section>
  );
}
