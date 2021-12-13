import { DireflowComponent } from 'direflow-component';
import DestinationKeyMetrics from './DestinationKeyMetrics';

export default DireflowComponent.create({
    component: DestinationKeyMetrics,
    configuration: {
        tagname: 'destination-key-metrics',
    },
    properties: {
        configuration: {
            bwApiRootUrl: "https://newapi.stage.brandwatch.net",
            destTarget: "#bundle-container",
            endDate: "2021-11-11T00:00:00+0000",
            filter: {
                queryId: [
                    161375145
                ]
            },
            locale: "en-GB",
            projectId: 161375132,
            startDate: "2021-11-01T00:00:00+0000",
            timezone: "Europe/London",
            token: "295077d6-3009-45b4-a6c0-2a097852fe4f"
        },
        data: {
            comparisonValue: 91967,
            label: "Total Mentions",
            value: 82028
        }
    }
});
