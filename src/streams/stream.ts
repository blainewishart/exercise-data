import {StreamDataItem, StreamInterface} from './stream.interface';
import {isNumber} from '../events/utilities/helpers';
import {DynamicDataLoader} from "../data/data.store";

export class Stream implements StreamInterface {
  public readonly type: string;
  public data: (number | null)[] = [];

  constructor(type: string, data?: (number | null)[]) {
    this.type = type;
    if (data) {
      this.data = data;
    }
  }

  getNumericData(): number[] {
    return <number[]>this.data.filter(data => isNumber(data))
  }

  /**
   * Gets the data based / offset on a startDate
   * @param startDate
   * @param filterNull
   * @param filterInfinity
   */
  getStreamDataByTime(startDate: Date, filterNull = false, filterInfinity = false): StreamDataItem[] {
    return this.data.reduce((accu, dataItem, index) => {
      if ((filterNull && dataItem === null) || (filterInfinity && dataItem === Infinity)) {
        return accu
      }
      accu.push({
        time: startDate.getTime() + index * 1000,
        value: dataItem,
      });
      return accu;
    }, <StreamDataItem[]>[])
  }

  /**
   * Gets the data offset on a time
   * @param offset
   * @param filterNull
   * @param filterInfinity
   */
  getStreamDataByDuration(offset: number = 0, filterNull = false, filterInfinity = false): StreamDataItem[] {
    return this.data.reduce((accu, dataItem, index) => {
      if ((filterNull && dataItem === null) || (filterInfinity && dataItem === Infinity)) {
        return accu
      }
      accu.push({
        time: index * 1000 + (offset || 0),
        value: dataItem,
      });
      return accu;
    }, <StreamDataItem[]>[])
  }

  isUnitDerivedDataType(): boolean {
    return DynamicDataLoader.isUnitDerivedDataType(this.type);
  }

  toJSON(): StreamJSONInterface {
    return {
      type: this.type,
      data: this.data,
    };
  }
}

export interface StreamJSONInterface {
  type: string;
  data: (number | null)[];
}
